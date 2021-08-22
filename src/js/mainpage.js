const { dialog, getGlobal, getCurrentWindow } = require('electron').remote
const path = require('path');

let store = getGlobal('store')
let basedir = store.get('basedir')

function removeDir() {
    store.delete('basedir')
    getCurrentWindow().loadFile(path.join(__dirname + '/../html/homepage.html'));
}