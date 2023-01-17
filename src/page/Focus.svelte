<script lang="ts">
	import {flip} from "svelte/animate";
	import {fade} from "svelte/transition";
	import {spring} from 'svelte/motion';
	import {cubicOut} from "svelte/easing";

	let coords;

	let testDe = [
		{name: "写作业", color: 0x03A9F4, id: 1},
		{name: "读书", color: 0x795548, id: 2},
		{name: "找BUG", color: 0x4CAF50, id: 3},
		{name: "测试数据 我来测试", color: 0x03A9F4, id: 4},
		{name: "尽量写长一点看看有没有BUG", color: 0x795548, id: 5},
		{name: "希望没有BUG", color: 0x03A9F4, id: 14},
		{name: "敲代码", color: 0x4CAF50, id: 6},
		{name: "写作业", color: 0x03A9F4, id: 7},
		{name: "读书", color: 0x795548, id: 8},
		{name: "刷视频", color: 0x4CAF50, id: 9},
		{name: "长跑", color: 0x4CAF50, id: 10},
		{name: "直播", color: 0x03A9F4, id: 11},
		{name: "打游戏", color: 0x795548, id: 12},
		{name: "吃饭", color: 0x4CAF50, id: 13},
	];

	let beDrag = [];
	let beDragID: any;

	function toHash(num: number): string {
		//console.log(num);
		return `#${num.toString(16).padStart(6, "0")}`;
	}

	let tempAniIn: Function = fade;

	function stall(e: MouseEvent, index: number, id) {
		const ele: HTMLLIElement = <HTMLLIElement>e.target;
		const bou = ele.getBoundingClientRect();
		const stEX = bou.x;
		const stEY = bou.y;
		coords = spring({x: stEX + 12, y: stEY + 12}, {stiffness: 0.1, damping: 0.4});
		//console.log("aaa");
		let isDrag = false;
		const tempLis = (em: MouseEvent) => {
			if (!isDrag && Math.abs(em.movementX) + Math.abs(em.movementY) > 2) {
				beDragID = id;
				isDrag = true;
				const tempitem = testDe.splice(index, 1)[0];
				tempAniIn = (node, {duration}) => {
					return {
						duration,
						css: t => {
							const eased = cubicOut(t);

							return `
                                    width: ${bou.width * .97 * (1 - eased) + 24 * eased}px;
                                    height: ${bou.height * .97 * (1 - eased) + 24 * eased}px;
                                    `;

						}
					};
				};
				beDrag.push(tempitem);
				//console.log(beDrag);
				testDe = testDe;
				beDrag = beDrag;
			}
			if (isDrag) {
				coords.set({x: em.clientX, y: em.clientY});
			}
		};
		window.addEventListener("mousemove", tempLis);
		const letGo = () => {

			if (isDrag && beDrag.length) {
				testDe.splice(index, 0, beDrag.splice(0, 1)[0]);
				testDe = testDe;
				beDrag = beDrag;
			}
			beDragID = null;

			window.removeEventListener("mousemove", tempLis);
			window.removeEventListener("mouseup", letGo);
		};
		window.addEventListener("mouseup", letGo);
	}

	function del() {
		if (beDrag.length) {
			console.log(beDrag[0]);
			beDrag.pop();
		}
	}
</script>
<div class="main">
    <svg class="render-layers">
        {#each beDrag as item (item.id)}
            <rect fill="{toHash(item.color)}"
                  x="{$coords.x - 12}"
                  y="{$coords.y - 12}"
                  rx="12"
                  ry="12"
                  class="ball"
                  in:tempAniIn={{duration: 300}} out:fade={{duration:150}}/>
        {/each}
    </svg>
    <div class="mainBox">
        <ul class="control">
            <li class="ft-st cd iconfont add">&#xe601;</li>
            <li class="ft-st cd iconfont fst">&#xe65c;</li>
            <li class="ft-st cd iconfont chk">&#xe65a;</li>
            <li class="ft-st cd iconfont str">&#xe60b;</li>
            <li class="ft-st cd iconfont gab" on:mouseup={()=>{del()}}>&#xe654;</li>
        </ul>
        <ul class="content">
            {#each testDe as item,index (item.id)}
                <li class="ft-st cd"
                    style="background-color: {toHash(item.color)};"
                    class:beDrag={item.id===beDragID}
                    animate:flip={{duration:330}}
                    on:mousedown={(e)=>{stall(e,index,item.id)}}
                    in:fade={{duration:330}}>
                    {item.name}
                    <div class="detail">{item.id}:还没写呢，欸嘿~</div>
                </li>
            {/each}
        </ul>
    </div>
</div>

<style lang="postcss">
    .main {
        background-color: transparent;
        height: 100%;
        width: 100%;

        & .render-layers {
            position: fixed;
            width: 100%;
            height: 100%;
            background-color: transparent;
            top: 0;
            left: 0;
            pointer-events: none;
            z-index: 100;
            filter: drop-shadow(0 0 3px rgba(33, 33, 33, .3));

            & .ball {
                width: 24px;
                height: 24px;
            }
        }

        & .mainBox {
            padding: 26px;
            border-radius: var(--mainRadius);
            background-color: #EFEFEF;
            width: 100%;
            height: 100%;
            display: grid;
            gap: 18px;
            grid-template-columns: 1fr 72px;
            grid-template-areas:"ten con";

            & .control {
                grid-area: con;
                background-color: #fff;
                border-radius: var(--mainRadius);
                padding: 18px;
                display: flex;
                flex-direction: column;

                & .ft-st.cd {
                    height: 40px;
                    width: 40px;
                    margin: 0;
                    background-color: rgba(204, 204, 204, 0.8);
                    color: #333;
                    font-size: 26px;
                    line-height: 26px;
                    padding: 6px;
                    writing-mode: vertical-lr;
                    transition: all 250ms;

                    &:hover {
                        transform: scale(105%);
                        box-shadow: 0 0 8px rgba(33, 33, 33, .3);
                        height: 120px;

                        &:after {
                            color: #333;
                        }
                    }

                    &::after {
                        font-family: HarmoyOS_Sans;
                        font-weight: bold;
                        font-size: 16px;
                        transition: all 250ms;
                        color: transparent;
                        transform: unset;
                        display: block;
                        position: absolute;
                        left: 6px;
                        right: 6px;
                        top: 36px;
                        overflow: hidden;
                    }

                    &:active {
                        transition: all 160ms;
                        transform: scale(97%);
                        box-shadow: 0 0 3px rgba(33, 33, 33, .3);
                    }

                    &.add {
                        &::after {
                            content: "新建专注";
                        }
                    }

                    &.fst {
                        margin-top: 10px;

                        &::after {
                            content: "快速专注";
                        }
                    }

                    &.chk {
                        margin-top: 10px;

                        &::after {
                            content: "开启多选";
                        }
                    }

                    &.str {
                        margin-top: 10px;

                        &::after {
                            content: "拖来开始";
                        }
                    }

                    &.gab {
                        color: #f15555;
                        background-color: #f1555533;
                        display: table-cell;
                        vertical-align: bottom;
                        margin-top: auto;

                        &:active {
                            transform: scale(105%);
                            box-shadow: 0 0 8px rgba(33, 33, 33, .3);
                        }

                        &:hover {
                            &::after {
                                color: #f15555;
                            }
                        }

                        &::after {
                            content: "拖来删除";
                        }
                    }
                }
            }

            & .content {
                align-content: flex-start;
                background-color: #fff;
                border-radius: var(--mainRadius);
                padding: 8px 18px 18px 8px;
                grid-area: ten;
                display: flex;
                flex-wrap: wrap;
                overflow: auto;

                & .ft-st.cd {
                    color: #fff;

                    &.beDrag {
                        height: 24px;
                        width: 24px;
                        color: transparent;
                    }

                    & .detail {
                        margin-top: 6px;
                        background-color: #eaeaea2c;
                        color: #fff;
                        font-weight: normal;
                        font-size: 14px;
                        line-height: 14px;
                        padding: 6px;
                        border-radius: var(--mainRadius);
                        pointer-events: none;
                    }
                }
            }
        }
    }
</style>