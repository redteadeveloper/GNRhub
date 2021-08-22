const { dialog, getGlobal, getCurrentWindow } = require('electron').remote;
const { ipcRenderer } = require("electron");
const path = require('path');

let store = getGlobal('store');
let basedir = store.get('basedir');

function removeDir() {
    ipcRenderer.send('removeDir');
}