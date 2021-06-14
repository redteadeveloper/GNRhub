const { dialog, getGlobal, getCurrentWindow } = require('electron').remote
const path = require('path')

let store = getGlobal('store')

function run() {

    dialog.showOpenDialog({
        properties: ['openDirectory']
    }).then(function (response) {
        console.log(response.filePaths[0])
        store.set('basedir', response.filePaths[0])
        getCurrentWindow().loadFile(path.join(__dirname + '/../html/mainpage.html'))
    })

}

// let num = 1

// function test() {
//     num = num + 1
//     if (num > 5) num = 1
//     document.body.style.backgroundImage = `url('../img/background${num}.png')`;
// }

// setInterval(test, 7000);