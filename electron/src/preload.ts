import {contextBridge, ipcRenderer} from 'electron';

contextBridge.exposeInMainWorld("mainWindow", {
	node: () => process.versions.node,
	chrome: () => process.versions.chrome,
	electron: () => process.versions.electron,
	closeM: () => ipcRenderer.invoke('closeM'),
});