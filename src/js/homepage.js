const { dialog, getGlobal, getCurrentWindow } = require('electron').remote;
const { ipcRenderer } = require('electron');
const path = require('path');
const fs = require('fs');

let store = getGlobal('store');

function createDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

function run() {
    dialog.showOpenDialog({
        properties: ['openDirectory']
    }).then(function (response) {
        if (response.filePaths[0]) {
            console.log(response.filePaths[0]);
            store.set('basedir', response.filePaths[0]);

            createDir(response.filePaths[0].concat('/Miscellaneous'));
            createDir(response.filePaths[0].concat('/Bootleg Video'));
            createDir(response.filePaths[0].concat('/Bootleg Audio'));
            createDir(response.filePaths[0].concat('/Demo'));

            getCurrentWindow().close();
        }
    })
}

function closeWindow() {
    getCurrentWindow().close();
}

function minimizeWindow() {
    getCurrentWindow().minimize()
}