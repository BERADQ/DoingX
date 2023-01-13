<script lang="ts">
    import icon from "../assets/DoingX.svg"
</script>

<div class="main">
    <div class="bar">
        <img src="{icon}" alt="Doing"><span>Doing X</span>
        <button>&#xe604;</button>
        <button class="minimize">&#xe605;</button>
        <button class="shut">&#xe606;</button>
    </div>
</div>

<style lang="postcss">
    .main, .bar {
        width: 100%;
    }
    .main{
        -webkit-app-region: drag;
        & .bar{
            height: var(--wBorder);
            background-color: #fff;
            display: flex;
            justify-content: right;
            align-items: center;
            position: relative;
            & img{
                margin-right: auto;
                margin-left: 6px;
            }
            & span{
                z-index: 0;
                font-family: HarmoyOS_Sans;
                font-weight: bold;
                display: block;
                position: absolute;
                top: 0;
                text-align: center;
                width: 100%;
                height: var(--wBorder);
                line-height: var(--wBorder);
                color: #FFBA32;
                font-size: 20px;
            }
            & button{
                z-index: 10;
                transition: all 200ms;
                &:hover{
                    border-color:var(--mainColor);
                    box-shadow: 0 0 3px rgba(33,33,33,.2);
                    transform: scale(107%);
                }
                &.shut:active{
                    background-color: #ff8181;
                    border-color: #990055;
                }
                &.minimize:active{
                    background-color: #90bcff;
                    border-color: #0086b3;
                }
                &:active{
                    border-color:var(--mainColor);
                    box-shadow:none;
                    transform: scale(97%);
                    background-color: var(--mainColor);
                    color: #fff;
                }
                -webkit-app-region: none;
                font-family: "iconfont" !important;
                font-size: 16px;
                color: #999;
                border: 1px #DDD solid;
                border-radius: 6px;
                height: 30px;
                width: 30px;
                margin-right: 10px;
                background-color: #fff;
            }
        }
    }
</style>