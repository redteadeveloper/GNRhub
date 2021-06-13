const { dialog } = require('electron').remote

function run() {

    dialog.showOpenDialog({
        properties: ['openDirectory']
    }).then(function (response) {
        console.log(response)
    })
}

// let num = 1

// function test() {
//     num = num + 1
//     if (num > 5) num = 1
//     document.body.style.backgroundImage = `url('../img/background${num}.png')`;
// }

// setInterval(test, 7000);