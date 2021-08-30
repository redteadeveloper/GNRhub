const { dialog, getGlobal, getCurrentWindow } = require('electron').remote;
const { ipcRenderer, BrowserWindow } = require("electron");
const path = require('path');

var currentMenu;
var allMenus = ["Live", "Demo", "Misc"];

let store = getGlobal('store');
let basedir = store.get('basedir');

function changeActiveMenu(name) {
    for (let a in allMenus) {
        if (allMenus[a] === name) {
            let menuSpan = document.getElementById(`menu${name}`).getElementsByTagName("span")[0];
            menuSpan.style.setProperty("color", "white");
            let menu = document.getElementById(`menu${name}`);
            menu.style.setProperty("border-bottom", "2px solid yellow");
            $(document.getElementsByClassName("content")).load(`../html/menus/${name.toLowerCase()}.html`);
        } else {
            let menuSpan = document.getElementById(`menu${allMenus[a]}`).getElementsByTagName("span")[0];
            menuSpan.style.setProperty("color", "lightgrey");
            let menu = document.getElementById(`menu${allMenus[a]}`);
            menu.style.setProperty("border-color", "transparent");
        }
    }
}

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

function maximizeWindow() {
    getCurrentWindow().isMaximized() ? getCurrentWindow().unmaximize() : getCurrentWindow(). maximize()
}

function menuLive() {
    currentMenu = "live";
    changeActiveMenu("Live");
}

function menuDemo() {
    currentMenu = "demo";
    changeActiveMenu("Demo");
}

function menuMisc() {
    currentMenu = "misc";
    changeActiveMenu("Misc");
}