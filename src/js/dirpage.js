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

function selectDir() {
    dialog.showOpenDialog({
        properties: ['openDirectory']
    }).then(function (response) {
        if (response.filePaths[0]) {
            console.log(response.filePaths[0]);
            store.set('basedir', response.filePaths[0]);

            createDir(response.filePaths[0].concat('/Live/Video'));
            createDir(response.filePaths[0].concat('/Live/Audio'));
            createDir(response.filePaths[0].concat('/Demo'));
            createDir(response.filePaths[0].concat('/Miscellaneous'));

            getCurrentWindow().close();
        }
    });
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