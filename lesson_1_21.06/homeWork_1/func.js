const fs = require('fs');
const path = require('path');

const dir18 = path.join(__dirname, '18-00');
const dir20 = path.join(__dirname, '20-00')

//1) Студентів з 1800 перевести в групу на 2000. І навпаки

function changeDir(oldDir, newDir) {
    fs.readdir(oldDir, (err, files) => {
        if (err) {
            console.log(err);
            return
        }
        files.map(file => {
            fs.rename(path.join(oldDir, file), path.join(newDir, file), error => console.log(error))
        })
    })
}

// changeDir(dir20,dir18)

//2) Перемістити всіх дівчат в папку girls а хлопців в папаку boys

function genderFunction(directory) {
    fs.readdir(directory, (err, files) => {
        if (err) {
            console.log(err);
            return
        }
        files.map(file => {
            fs.readFile(path.join(directory, file), (error, data) => {
                if (error) console.log(error);
                if (JSON.parse(data.toString()).gender === 'female') {
                    fs.mkdir(path.join(__dirname, 'girls'), {recursive: true},
                        error => console.log(error));
                    fs.rename(path.join(directory,file), path.join(__dirname,'girls',file),
                            error => console.log(error))
                }
                if (JSON.parse(data.toString()).gender === 'male') {
                    fs.mkdir(path.join(__dirname, 'boys'), {recursive: true},
                        error => console.log(error));
                    fs.rename(path.join(directory,file), path.join(__dirname,'boys',file),
                        error => console.log(error))
                }
            })
        })
    })
}

// genderFunction(dir18)

