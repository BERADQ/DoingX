import {app, BrowserWindow, ipcMain} from 'electron';
import pathUtil from 'path';

const createWindow = () => {
	const win = new BrowserWindow({
		width: 800,
		height: 800,
		frame: false,
		transparent: true,
		hasShadow: true,
		webPreferences: {
			preload: pathUtil.join(__dirname, './preload.js')
		}
	});
	ipcMain.handle("closeM",()=>{
		win.close();
	})
	win.loadURL('http://localhost:5173').then(r => {
		console.log("ロード完了");
	});
};

app.whenReady().then(() => {
	createWindow();
	
	app.on("window-all-closed", () => {
		if (process.platform !== "darwin") {
			app.quit();
		}
	});
	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});




