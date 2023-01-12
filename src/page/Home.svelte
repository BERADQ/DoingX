<script lang="ts">

</script>

<div class="home">
    <div class="card-1">
        <ul class="left">
            <li class="fastQu">快速专注</li>
            <li class="backlog">新建待办</li>
            <li class="lookBack">回顾</li>
        </ul>
        <ul class="right">

        </ul>
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
            height: 250px;
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 18px;

            & .left, & .right {
                display: grid;
                padding: 18px;
                height: 100%;
                background-color: #fff;
                border-radius: 12px;
            }

            & .left {
                grid-template-columns: 1.5fr 1fr;
                grid-template-rows: 1fr 1fr 1fr 1fr;
                grid-template-areas:
                        "fastQu backlog"
                        "fastQu backlog"
                        "fastQu lookBack"
                        "durationBar lookBack";
                gap: 18px;
            }

            & .left .fastQu {
                grid-area: fastQu;
                color: #FFEBCD;
                font-family: SmileySans;
                font-size: 47px;
                padding-top: 83px;
                padding-left: 18px;
                overflow: hidden;
                border-radius: var(--mainRadius);
                background-color: #FF9800;
                height: 100%;
                position: relative;

                &::after {
                    font-family: "iconfont" !important;
                    position: absolute;
                    bottom: 0;
                    right: -12px;
                    transform: rotate(12deg);
                    content: "\e65c";
                    font-size: 100px;
                    color: #FFAD33;
                }
            }

            & .left .lookBack {
                grid-area: lookBack;
                color: #89cc8e;
                font-family: SmileySans;
                font-size: 30px;
                padding-top: 50px;
                padding-left: 12px;
                overflow: hidden;
                border-radius: var(--mainRadius);
                background-color: #E7F4E8;
                height: 100%;
                position: relative;

                &::after {
                    font-family: "iconfont" !important;
                    position: absolute;
                    bottom: 6px;
                    right: 6px;
                    transform: rotate(12deg);
                    content: "\e622";
                    font-size: 80px;
                    color: #ceeed0;
                }
            }

            & .left .backlog {
                grid-area: backlog;
                color: #7ab3de;
                font-family: SmileySans;
                font-size: 30px;
                padding-top: 50px;
                padding-left: 12px;
                overflow: hidden;
                border-radius: var(--mainRadius);
                background-color: #E1F1FD;
                height: 100%;
                position: relative;

                &::after {
                    font-family: "iconfont" !important;
                    position: absolute;
                    bottom: -13px;
                    right: -3px;
                    transform: rotate(12deg);
                    content: "\e60a";
                    font-size: 100px;
                    color: #c4def1;
                }
            }
        }
    }
</style>