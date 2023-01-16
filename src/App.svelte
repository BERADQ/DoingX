<script lang="ts">
	import Home from "./page/Home.svelte";
	import LeftBar from "./lib/LeftBar.svelte";
	import TopBar from "./lib/TopBar.svelte";
	import Focus from "./page/Focus.svelte";
	import {tweened} from "svelte/motion";
	import {quintOut} from "svelte/easing";
	import {fade, fly} from "svelte/transition";

	const mainOpacity = tweened(1, {
		duration: 250,
		easing: quintOut,
	});
	console.log(mainWindow.node(), mainWindow.chrome(), mainWindow.electron());
	const xClose = () => {
		setTimeout(mainWindow.closeM, 250);
		$mainOpacity = 0;
	};
	const xMin = () => {
		setTimeout(() => {
			mainWindow.minM();
			mainOpacity.set(1, {duration: 0});
		}, 200);
		mainOpacity.set(0, {duration: 200});
	};

	let nowPage = "a";
	$:console.log(nowPage);
</script>

<main>
    <div class="main" style="opacity: {$mainOpacity}">
        <TopBar on:wClose={xClose} on:wMin={xMin}/>
        <div class="window">
            <div class="leftBar">
                <LeftBar on:tabChange={(e)=>{nowPage=e.detail}}/>
            </div>
            {#if nowPage === "a"}
                <div class="home" in:fly={{duration:250,y:24,delay:50}} out:fade={{duration:250,opacity:.3}}>
                    <Home/>
                </div>
            {:else if nowPage === "b"}
                <div class="focus" in:fly={{duration:250,y:24,delay:50}} out:fade={{duration:250,opacity:.3}}>
                    <Focus/>
                </div>
            {/if}
        </div>
    </div>
</main>

<style lang="postcss">
    main {

        height: 100%;
        padding: var(--outBorder);

        & .main {
            box-sizing: border-box;
            border: 1px solid #6e6e6e;
            border-radius: var(--mainRadius);
            overflow: hidden;
            width: 100%;
            height: 100%;
            background-color: #fff;
            box-shadow: 0 0 4px rgba(66, 66, 66, .7);

        }
    }

    .window {
        width: 100%;
        height: var(--mHeight);
        display: flex;
        position: relative;

        & .leftBar {
            z-index: 10;
        }

        & .home {
            position: absolute;
            left: 45px;
            right: 3px;
            bottom: 3px;
            top: 0px;
        }

        & .focus {
            position: absolute;
            left: 45px;
            right: 3px;
            bottom: 3px;
            top: 0px;
        }
    }
</style>