const { dialog, getGlobal, getCurrentWindow } = require("electron").remote;
const { ipcRenderer, BrowserWindow } = require("electron");
const path = require("path");

var currentMenu;
var allMenus = ["Live", "Demo", "Misc"];

let store = getGlobal("store");
let basedir = store.get("basedir");

function changeActiveMenu(name) {
    for (let a in allMenus) {
        if (allMenus[a] === name) {
            let menu = document.getElementById(`menu${name}Button`);
            menu.getElementsByTagName("span")[0].style.setProperty("color", "white");
            menu.style.setProperty("border-bottom", "2px solid yellow");
            $(document.getElementsByClassName("content")).load(`../html/menus/${name.toLowerCase()}.html`);
        } else {
            let menu = document.getElementById(`menu${allMenus[a]}Button`);
            menu.style.setProperty("border-color", "transparent");
            menu.getElementsByTagName("span")[0].style.setProperty("color", "lightgrey");
        }
    }
}

function removeDir() {
    ipcRenderer.send("removeDir");
}

// Window

// Minimize
function minimizeWindow() {
    getCurrentWindow().minimize();
}

// Maximize
function maximizeWindow() {
    getCurrentWindow().isMaximized() ? getCurrentWindow().unmaximize() : getCurrentWindow().maximize()
}

// Close
function closeWindow() {
    if (store.get("basedir") == undefined) {
        ipcRenderer.send("closeDirSelectPage");
    } else {
        getCurrentWindow().close();
    }
}

// Open menu

// Open live menu
function menuLiveButton() {
    currentMenu = "live";
    changeActiveMenu("Live");
}

// Open demo menu
function menuDemoButton() {
    currentMenu = "demo";
    changeActiveMenu("Demo");
}

// Open misc menu
function menuMiscButton() {
    currentMenu = "misc";
    changeActiveMenu("Misc");
}

