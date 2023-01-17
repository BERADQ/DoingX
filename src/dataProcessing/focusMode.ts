import {writable} from "svelte/store";
import {FocusM} from "../tsd";

const focus = writable(<FocusM[]>[], () => {
	console.log("产生订阅");
	return () => {
		console.log("结束订阅");
	};
});
focus.set([
	FocusM.from({name: "测试专注模式1", positiveTiming: false}),
	FocusM.from({name: "测试专注模式2", positiveTiming: false}),
	FocusM.from({name: "测试专注模式3", positiveTiming: false}),
	FocusM.from({name: "测试专注模式4", positiveTiming: false}),
	FocusM.from({name: "测试专注模式5", positiveTiming: false}),
	FocusM.from({name: "测试专注模式6", positiveTiming: false}),
]);

export {focus};