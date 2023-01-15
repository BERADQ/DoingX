import {app, BrowserWindow, ipcMain} from 'electron';
import pathUtil from 'path';

const createWindow = () => {
	const win = new BrowserWindow({
		width: 940,
		minWidth: 940,
		height: 560,
		minHeight: 490,
		frame: false,
		transparent: false,
		hasShadow: true,
		webPreferences: {
			preload: pathUtil.join(__dirname, './preload.js'),
			scrollBounce: true,
			webSecurity: false,
			zoomFactor: 1.0,
		}
	});
	
	
	ipcMain.handle("closeM", () => {
		win.close();
	});
	ipcMain.handle('minM', function () {
		win.minimize();
	});
	
	
	win.loadURL('http://localhost:5173').then(r => {
		console.log("ロード完了");
	});
	// win.loadFile('./index.html').then(r => {
	// 	console.log("ロード完了");
	// });
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




