const { dialog } = require('electron').remote
const hbjs = require('handbrake-js')

let arr = []

function run() {

    dialog.showOpenDialog({
        properties: ['openDirectory']
    }).then(function (response) {
   
    })
}