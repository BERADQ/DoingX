<script lang="ts">
	import Drag from "../lib/Drag.svelte";

	const testDe = [
		{name: "写作业", color: 0x03A9F4},
		{name: "读书", color: 0x795548},
		{name: "慢跑", color: 0x4CAF50},
	];

	function toHash(num:number):string{
		return `#${num.toString(16).padStart(6,"0")}`;
    }
</script>

<div class="home">
    <div class="card-1">
        <ul class="left">
            <li class="fastQu st">快速专注</li>
            <li class="backlog st">新建待办</li>
            <li class="lookBack st">回顾</li>
            <li class="durationBar">
                <Drag/>
                <button class="st">开 始</button>
            </li>
        </ul>
        <ul class="right">
            {#each testDe as item}
                <li class="st" style="background-color: {toHash(item.color)}"></li>
            {/each}
        </ul>
        <div class="down">

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
            grid-template-columns: 2fr 1fr;
            grid-template-rows: 250px 1fr;
            grid-template-areas:
                            "left right"
                            "down right";
            gap: 18px;

            & .left, & .right, & .down {
                display: grid;
                padding: 18px;
                height: 100%;
                background-color: #fff;
                border-radius: 12px;
                & .st {
                    font-family: SmileySans;
                    overflow: hidden;
                    height: 100%;
                    position: relative;
                    border-radius: var(--mainRadius);
                    padding-top: 50px;
                    padding-left: 12px;
                    transition: all 180ms;
                    box-shadow: 0 0 3px rgba(33, 33, 33, .3);

                    &::after {
                        font-family: "iconfont" !important;
                        position: absolute;
                        transform: rotate(12deg);
                    }

                    &:hover {
                        transform: scale(102%);
                        box-shadow: 0 0 12px rgba(33, 33, 33, .3);
                    }

                    &:active {
                        transition: all 160ms;
                        transform: scale(98%);
                        box-shadow: 0 0 6px rgba(33, 33, 33, .3);
                    }
                }
            }

            & .right {
                grid-area: right;
                display: flex;
            }

            & .down {
                grid-area: down;
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