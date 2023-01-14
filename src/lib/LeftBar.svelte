<script lang="ts">
	import {createEventDispatcher} from "svelte";

	let checkedItem: string = "a";
	const dispatch = createEventDispatcher();
	$:dispatch("tabChange", checkedItem);
</script>

<div class="main">
    <div class="table">
        <div class="in a" on:click={()=>checkedItem="a"} class:checked={checkedItem==="a"}>
            <span class="iconfont myIcon">&#xe6bd;</span>
            <span class="title">主页</span>
        </div>
        <div class="in b" on:click={()=>checkedItem="b"} class:checked={checkedItem==="b"}>
            <span class="iconfont myIcon">&#xe633;</span>
            <span class="title">专注</span>
        </div>
        <div class="in c" on:click={()=>checkedItem="c"} class:checked={checkedItem==="c"}>
            <span class="iconfont myIcon">&#xe60a;</span>
            <span class="title">规划</span>
        </div>
        <div class="in d" on:click={()=>checkedItem="d"} class:checked={checkedItem==="d"}>
            <span class="iconfont myIcon">&#xe622;</span>
            <span class="title">回顾</span>
        </div>
        <div class="in e" on:click={()=>checkedItem="e"} class:checked={checkedItem==="e"}>
            <span class="iconfont myIcon">&#xe657;</span>
            <span class="title">设置</span>
        </div>
    </div>
</div>

<style lang="postcss">
    .main {
        -webkit-app-region: drag;
        height: 100%;
        width: var(--wBorder);
        background-color: #fff;

        & .table {
            display: flex;
            -webkit-app-region: none;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            height: 490px;

            & .in {
                padding: 10px 0;

                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-between;
                appearance: none;
                -webkit-appearance: none;
                outline: none;
                margin: 6px;
                width: 33px;
                height: 33px;
                background-color: #EFEFEF;
                border-radius: var(--mainRadius);
                transition: all 250ms;
                position: relative;
                overflow: hidden;

                &.a {
                    --ltTitColor: #e59700;
                    --ltBgColor: #fff4d3;
                }
                &.b {
                    --ltTitColor: #e59700;
                    --ltBgColor: #fff4d3;
                }
                &.c {
                    --ltTitColor: #7AB3DE;
                    --ltBgColor: #E1F1FD;
                }
                &.d {
                    --ltTitColor: #89CC8E;
                    --ltBgColor: #E7F4E8;
                }
                &.e {
                    --ltTitColor: #333;
                    --ltBgColor: #ddd;
                }

                &:first-child {
                    margin-top: 0;
                }

                & span {
                    transition: all 250ms;
                }

                & .title {
                    display: block;
                    color: #999;
                    font-family: SmileySans;
                    letter-spacing: 6px;
                    font-weight: normal;
                    writing-mode: vertical-rl;
                    font-size: 16px;
                    height: 46px;
                    position: absolute;
                    top: 41px;
                }

                & .myIcon {
                    color: #999;
                    font-size: 21px;
                    margin-top: -4px;
                }

                &::before {
                    transition: all 250ms;
                    content: "";
                    position: absolute;
                    top: 8px;
                    bottom: 8px;
                    left: 4px;
                    width: 3px;
                    background-color: transparent;
                    border-radius: 3px;
                }

                &.checked {
                    background-color: var(--ltBgColor);
                    height: 88px;

                    & span {
                        color: var(--ltTitColor);
                        margin-left: 4px;
                    }

                    & .myIcon {
                        margin-top: unset;
                    }

                    &::before {
                        background-color: var(--ltTitColor);
                    }
                }


            }
        }
    }
</style>