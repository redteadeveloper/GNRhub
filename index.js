const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const Store = require('electron-store');

const store = new Store();
global.store = store;

require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', 'electron', 'dist', 'electron.exe')
});

let mainWindow;
let childWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 600,
        height: 400,
        frame: false,
        transparent: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        resizable: false
    });

    mainWindow.loadFile('./src/html/mainpage.html');

    if (store.get('basedir') == undefined ) {
        childWindow = new BrowserWindow({
            parent: mainWindow,
            width: 300,
            height: 300,
            modal: true,
            frame: false,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false
            },
            resizable: false
        })
        childWindow.loadFile('./src/html/homepage.html');
    }

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
    if (mainWindow === null) createWindow();
});

ipcMain.on('removeDir', () => {
    childWindow = new BrowserWindow({
        parent: mainWindow,
        width: 300,
        height: 300,
        modal: true,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        resizable: false
    });

    childWindow.loadFile('./src/html/homepage.html');
});

ipcMain.on('closeDirSelectPage', () => {

    const options = {
        type: 'question', 
        buttons: ['Yes', 'No'],
        defaultId: 2,
        title: 'Exit?',
        message: 'You didn\'t select a folder. Exit?',
        checkboxChecked: false,
    };

    if (store.get('basedir') == undefined ) {
        dialog.showMessageBox(null, options).then(function(res) {
            if(res.response == 0) {
                app.quit();
            }
        });
    }
});