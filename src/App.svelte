<script lang="ts">
	import Home from "./page/Home.svelte";
	import LeftBar from "./lib/LeftBar.svelte";
	import TopBar from "./lib/TopBar.svelte";
	import {tweened} from "svelte/motion";
	import {quintOut} from "svelte/easing";

	const mainOpacity = tweened(1, {
		duration: 250,
		easing: quintOut,
	});
	console.log(mainWindow.node(), mainWindow.chrome(), mainWindow.electron());
	const xClose = () => {
		setTimeout(mainWindow.closeM, 250);
		$mainOpacity = 0;
	};
</script>

<main>
    <div class="main" style="opacity: {$mainOpacity}">
        <TopBar on:wClose={xClose}/>
        <div class="window">
            <LeftBar/>
            <div class="home">
                <Home/>
            </div>
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

        & .home {
            margin-right: 3px;
            margin-bottom: 3px;
            width: 100%;
        }
    }
</style>