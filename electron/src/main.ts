import {app, BrowserWindow, ipcMain} from 'electron';
import pathUtil from 'path';

const initializeScaling = 1;

const createWindow = () => {
	const win = new BrowserWindow({
		width: (940 * initializeScaling) << 0,
		minWidth: (940 * initializeScaling) << 0,
		height: (560 * initializeScaling) << 0,
		minHeight: (490 * initializeScaling) << 0,
		frame: false,
		transparent: true,
		hasShadow: true,
		webPreferences: {
			preload: pathUtil.join(__dirname, './preload.js'),
			scrollBounce: true,
			webSecurity: false,
			zoomFactor: initializeScaling,
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
	
	
	win.webContents.on("did-finish-load", () => {
		win.webContents.setZoomFactor(initializeScaling);
		//win.webContents.setZoomLevel(initializeScaling ** (1 / 1.2));
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




