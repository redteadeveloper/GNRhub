const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const Store = require('electron-store');

const store = new Store();
global.store = store;

require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', 'electron', 'dist', 'electron.exe')
});

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 600,
        height: 400,
        frame: false,
        transparent: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js')
        },
        resizable: false
    })

    if (store.get('basedir') == undefined ) {
        mainWindow.loadFile('./src/html/homepage.html');
    } else {
        mainWindow.loadFile('./src/html/mainpage.html');
    }
    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', function () {
        mainWindow = null;
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
})

app.on('activate', function () {
    if (mainWindow === null) createWindow();
})

ipcMain.on('open-new-window', (event, fileName) => {
    let win = new BrowserWindow({ width:960, height:540 });
    win.loadURL(`file://${__dirname}/` + fileName + `.html`);
})