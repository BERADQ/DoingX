<script lang="ts">
	import {tweened} from 'svelte/motion';
	import {cubicOut} from "svelte/easing";

	let time: number = 30;
	let maxTime: number = 120;
	let minTime: number = 1;

	let isHover = false;

	let barWidth: number;
	const timeWidth = tweened((((barWidth - 20) * (time - minTime) / (maxTime - minTime)) + 20) >> 0, {
		duration: 200,
		easing: cubicOut
	});

	$: $timeWidth = (((barWidth - 20) * (time - minTime) / (maxTime - minTime)) + 20) >> 0;
	const hMove = (evt: MouseEvent) => {
		const {left, right} = tClient;
		let movementX: number = (evt.clientX - left) / ((right) - (left));
		time = Math.min(Math.max(Math.round((maxTime) * movementX),minTime),maxTime);

		console.log(movementX);
	};
	let tClient: DOMRect;

	function hDown(e: MouseEvent) {
		tClient = this.getBoundingClientRect();
		const {left, right} = tClient;
		let movementX: number = (e.clientX - left) / (right - left);
		time = (maxTime - minTime) * movementX >> 0;
		window.addEventListener("mousemove", hMove);
		window.addEventListener("mouseup", hUp);
		isHover = true;
	}

	function hUp() {
		window.removeEventListener("mousemove", hMove);
		window.removeEventListener("mouseup", hUp);
		isHover = false;
	}
</script>

<div class="main">
    <div class="back" bind:clientWidth={barWidth} on:mousedown={hDown} class:hover={isHover}>
        <div class="mainBar" style="width: {$timeWidth}px;">
            <span class="num inbox" class:sm={time<15}>{time}</span>
        </div>
    </div>
</div>

<style lang="postcss">
    .main {
        width: 100%;
        height: 100%;
        position: relative;

        & .back {
            width: 100%;
            height: 100%;
            background-color: #FFF7DE;
            border-radius: var(--mainRadius);
            transition: all 180ms;
            box-shadow: 0 0 3px rgba(33, 33, 33, .3);
            position: absolute;
            overflow: hidden;

            &:hover {
                transform: scale(102%);
                box-shadow: 0 0 12px rgba(33, 33, 33, .3);
            }

            &.hover {
                transform: scale(102%);
                box-shadow: 0 0 12px rgba(33, 33, 33, .3);
            }

            & .mainBar {
                height: 100%;
                background-color: #FFC107;
                border-radius: var(--mainRadius);
                position: absolute;

                &::before {
                    content: "";
                    position: absolute;
                    top: 8px;
                    bottom: 8px;
                    right: 8px;
                    width: 6px;
                    background-color: #EEE;
                    border-radius: var(--mainRadius);
                    transition: all 280ms;
                }

                display: flex;
                justify-content: center;
                align-items: center;
            }

            &:active .mainBar::before {
                right: 6px;
                transform: scale(120%);
            }

            & .num {
                position: absolute;
                font-family: HarmoyOS_Sans;
                font-weight: bold;
                font-size: 18px;
                color: #EEE;
                line-height: 100%;
                text-align: center;
                transition: all 200ms;
            }

            & .num.sm {
                right: -25px;
                color: #efbc21;
            }
        }
    }
</style>