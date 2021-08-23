const { dialog, getGlobal, getCurrentWindow } = require('electron').remote;
const { ipcRenderer, BrowserWindow } = require("electron");
const path = require('path');

let store = getGlobal('store');
let basedir = store.get('basedir');

function removeDir() {
    ipcRenderer.send('removeDir');
}

function closeWindow() {
    if (store.get('basedir') == undefined) {
        ipcRenderer.send('closeDirSelectPage');
    } else {
        getCurrentWindow().close();
    }
}

function minimizeWindow() {
    getCurrentWindow().minimize();
}