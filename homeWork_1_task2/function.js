//* вам потрбіно перемісти всі файлики з вкладених папок в іншу папку.
//Зробити всі файли на одному рівні вкладеності.

const fs = require('fs');
const path = require('path');

const pathWay = __dirname;


function flatFiles (pathName) {
    fs.readdir(pathName, (err, files) => {
        if (err) {
            console.log(err);
            return
        }
        files.forEach(file => {
            fs.stat(path.join(pathName, file), (error, stats) => {
                if (error) console.log(error);
                if (!stats.isDirectory() && file !== 'function.js') {
                    fs.rename(path.join(pathName,file), path.join('finishDirectory',file ),
                        err1 => console.log(err1))
                } else {
                    flatFiles(path.join(pathName,file))
                }
            })
        })
    })
}

// flatFiles(pathWay)