const { dialog, getGlobal, getCurrentWindow } = require('electron').remote;
const { ipcRenderer } = require('electron');
const path = require('path');
const fs = require('fs');

function closeWindow() {
    getCurrentWindow().close();
}

function minimizeWindow() {
    getCurrentWindow().minimize();
}

function selectDir() {

}