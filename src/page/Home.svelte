<script lang="ts">
	import Drag from "../lib/Drag.svelte";
	import {flip} from "svelte/animate";
	import {BackLog} from "../tsd";
	import {focus} from "../dataProcessing/focusMode";

	let beLog: BackLog[] = [
		BackLog.from({logRepeat: "day", logName: "这是每日重复backlog测试01"}),
		BackLog.from({logRepeat: "day", logName: "这是每日重复backlog测试02"}),
		BackLog.from({logRepeat: "month", logName: "这是每月重复backlog测试01"}),
		BackLog.from({logRepeat: "none", logName: "这是无重复backlog测试01"}),
		BackLog.from({logRepeat: "none", logName: "这是无重复backlog测试02"}),
		BackLog.from({logRepeat: "none", logName: "这是无重复backlog测试03"}),
		BackLog.from({logRepeat: "none", logName: "这是无重复backlog测试04"}),
	];
	console.log(beLog);

	function reLis() {
		beLog.forEach((item, i) => {
			if (item.isCompleted === true) {
				beLog.push(...beLog.splice(i, 1));
			}
		});
	}

	reLis();

	function finsLog(fp: BackLog) {
		let item = beLog.find((se) => {
			return fp.logUUID === se.logUUID;
		});
		let index = beLog.findIndex((se) => {
			return se.logUUID === item.logUUID;
		});
		beLog.forEach((x, i) => {
			if (x.inheritUUID && x.inheritUUID === item.logUUID) {
				beLog.splice(i, 1);
				//console.log(x);
			}
		});
		if (item.inheritUUID && item.isCompleted === true) {
			beLog.forEach(value => {
				if (value.logUUID === item.inheritUUID) {
					value.unitBacktracking();
					beLog.splice(index, 1);
				}
			});
		}
		let temp = item.setCompleted();
		if (temp) {
			beLog.splice(index, 0, temp);
		}
		beLog = beLog;
		//console.log(beLog);
	}

	//const testApi = "https://v1.hitokoto.cn/";
	// axios.get(testApi, {responseType: "json"}).then(item => {
	// 	console.log(item);
	// });


	function formatTheDate(time: number): string {
		let temp = new Date(time);
		return `${temp.getMonth() + 1}-${temp.getDate()}`;
	}
	
	function getDis(item: BackLog): boolean {
		let itemDate = new Date(item.logStarTime);
		let now = new Date();
		return itemDate.getDate() <= now.getDate()
			&& itemDate.getMonth() <= now.getMonth()
			&& itemDate.getFullYear() <= now.getFullYear();
	}
</script>

<div class="home">
    <div class="card-1">
        <ul class="left">
            <li class="fastQu ft-st" tabindex="0">快速专注</li>
            <li class="backlog ft-st" tabindex="0">新建待办</li>
            <li class="lookBack ft-st" tabindex="0">回顾</li>
            <li class="durationBar">
                <Drag/>
                <button class="ft-st">开 始</button>
            </li>
        </ul>
        <ul class="right">
            <li class="title"><span class="iconfont icon">&#xe633;</span> 专注模式</li>
            {#each $focus as item (item.id)}
                <li
                        tabindex="0"
                        class="ft-st cd"
                        style="background-color: {item.color}"
                        animate:flip={{duration: 250,}}>
                    {item.name}
                </li>
            {/each}
        </ul>
        <div class="down">
            <div class="one">
                <div class="title"><span class="iconfont icon">&#xe60a;</span> 当日待办</div>
                <ul>
                    {#each beLog.filter(se => getDis(se)) as item,i (item.logUUID)}
                        <li class="ft-st beDo"
                            tabindex="0"
                            class:checked={item.isCompleted}
                            on:click={()=>{finsLog(item)}}
                            on:keyup={(e)=>{if (e.key==="Enter") finsLog(item);}}
                            animate:flip={{duration: 250 + beLog.length*10,}}>
                            <span class="iconfont check">
                                {item.isCompleted ? String.fromCharCode(0xe60d) : String.fromCharCode(0xe60b)}
                            </span>
                            <span class="logName">
                                <span class="logDate">{formatTheDate(item.logStarTime)}</span>
                                {item.logName}
                            </span>
                        </li>
                    {/each}
                </ul>
            </div>
        </div>
    </div>
</div>

<style lang="postcss">
    .home {
        border-radius: var(--mainRadius);
        background-color: #efefef;
        padding: 26px;
        width: 100%;
        height: 100%;

        & .card-1 {
            height: 100%;
            display: grid;
            grid-template-columns: 550px 1fr;
            grid-template-rows: 250px 1fr;
            grid-template-areas:
                            "left down"
                            "right down";
            gap: 18px;

            & .left, & .right, & .down {
                display: grid;
                padding: 18px;
                height: 100%;
                background-color: #fff;
                border-radius: var(--mainRadius);
            }

            & .title {
                padding-left: 10px;
                padding-top: 8px;
                position: sticky;
                top: 0;
                box-shadow: 0 8px 5px #fff;
                background-color: #fff;
                z-index: 10;
                color: #FFAD33;
                font-family: SourceHan_Sans;
                width: 100%;
                font-size: 18px;
            }

            & .down {
                overflow: auto;
                padding: 0 0 18px;

                & .one {
                    transition: all 250ms;

                    & .title {
                        padding-left: 18px;
                        color: #7AB3DE;
                    }

                    & .beDo {
                        padding: 10px;
                        margin-top: 12px;
                        margin-right: 21px;
                        margin-left: 21px;
                        background-color: #f5f5f5;
                        font-family: SourceHan_Sans;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        color: #7AB3DE;
                        font-weight: bold;
                        font-size: 18px;
                        position: unset;

                        & .check {
                            font-size: 20px;
                            color: #C4DEF1;
                            margin-right: 10px;
                        }

                        & .logDate {
                            font-size: 18px;
                            color: #C4DEF1;
                            font-weight: normal;
                        }

                        &.checked {
                            background-color: #ccc;
                            color: #999;

                            & .check {
                                color: #aaa;
                            }

                            & .logDate {
                                color: #aaa;
                            }

                            & .logName {
                                text-decoration: line-through 2px;
                                text-decoration-color: #638DAD;
                            }
                        }
                    }

                }
            }

            & .right {
                height: unset;
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: flex-start;
                grid-area: right;
                padding-top: 0;
                padding-left: 8px;
                padding-bottom: 0;
                flex-wrap: wrap;
                align-content: flex-start;
                overflow: auto;
                position: relative;

                &::after {
                    background-color: #fff;
                    content: "";
                    position: sticky;
                    height: 10px;
                    width: 100%;
                    bottom: 0;
                    margin-top: 5px;
                    box-shadow: 0 -4px 5px #fff;
                }
            }

            & .down {
                grid-area: down;
                padding-top: 0;
            }

            & .left {
                grid-area: left;
                grid-template-columns: 1.5fr 1fr;
                grid-template-rows: 1fr 1fr 1fr 1fr;
                grid-template-areas:
                        "fastQu backlog"
                        "fastQu backlog"
                        "fastQu lookBack"
                        "durationBar lookBack";
                gap: 18px;

                & li.fastQu {
                    grid-area: fastQu;
                    color: #FFEBCD;
                    font-size: 47px;
                    padding-top: 83px;
                    padding-left: 18px;
                    background-color: #FF9800;

                    &::after {
                        bottom: 0;
                        right: -12px;
                        content: "\e65c";
                        font-size: 100px;
                        color: #FFAD33;
                    }
                }

                & .lookBack {
                    grid-area: lookBack;
                    color: #89cc8e;
                    font-size: 30px;
                    background-color: #E7F4E8;

                    &::after {
                        bottom: 6px;
                        right: 6px;
                        content: "\e622";
                        font-size: 80px;
                        color: #ceeed0;
                    }
                }

                & .backlog {
                    grid-area: backlog;
                    color: #7ab3de;
                    font-size: 30px;
                    background-color: #E1F1FD;

                    &::after {
                        bottom: -13px;
                        right: -3px;
                        content: "\e60a";
                        font-size: 100px;
                        color: #c4def1;
                    }
                }

                & .durationBar {
                    grid-area: durationBar;
                    display: flex;

                    & button {
                        color: #EEE;
                        font-size: 18px;
                        border: 0;
                        width: 100px;
                        margin-left: 18px;
                        background-color: #FFC107;
                        padding: 0;

                        &:hover {
                            transform: scale(108%);
                        }

                        &:active {
                            transform: scale(96%);
                        }
                    }
                }
            }
        }
    }
</style>