import {contextBridge} from 'electron';

contextBridge.exposeInMainWorld("mainWindow", {
	node: () => process.versions.node,
	chrome: () => process.versions.chrome,
	electron: () => process.versions.electron,
});