// - у вас є масив юзрів (до 10), з такими полями наприклад - const users = [
//     { name: 'olya', gender: 'female', age: 20 }
//         ...
// ], вам потрібно написати метод який створює файлики - де назва файлику - це імя вашого юзера
// (наприклад - Olya.txt),
// вміст це сам ваш юзер - { name: 'olya', gender: 'female', age: 20 }
// перед тим створити 4 папки - наприклад - manOlder20, manYounger20, womanOlder20, womanYounger20
// і розподілити ваших юзерів саме по відповідних папках

const fs = require('fs');
const path = require('path');

const users = [
    {name: 'olya', gender: 'female', age: 20},
    {name: 'misha', gender: 'male', age: 30},
    {name: 'oleg', gender: 'male', age: 40},
    {name: 'tanya', gender: 'female', age: 17},
    {name: 'masha', gender: 'female', age: 35},
    {name: 'vasya', gender: 'male', age: 16},
    {name: 'olenka', gender: 'female', age: 18}
];

function createFiles(array) {
    array.forEach(user => {
        if (user.gender === 'female' && user.age < 20) {
            fs.mkdir(path.join(__dirname, 'womanYounger20'), {recursive: true},
                error => console.log(error));
            fs.writeFile(path.join(__dirname, 'womanYounger20', `${user.name}.txt`), JSON.stringify(user),
                err => console.log(err))
            return;
        }
        if (user.gender === 'female' && user.age >= 20) {
            fs.mkdir(path.join(__dirname, 'womanOlder20'), {recursive: true},
                error => console.log(error));
            fs.writeFile(path.join(__dirname, 'womanOlder20', `${user.name}.txt`), JSON.stringify(user),
                err => console.log(err));
            return;
        }
        if (user.gender === 'male' && user.age < 20) {
            fs.mkdir(path.join(__dirname, 'manYounger20'), {recursive: true},
                error => console.log(error));
            fs.writeFile(path.join(__dirname, 'manYounger20', `${user.name}.txt`), JSON.stringify(user),
                err => console.log(err));
            return;
        }
        if (user.gender === 'male' && user.age >= 20) {
            fs.mkdir(path.join(__dirname, 'manOlder20'), {recursive: true},
                error => console.log(error));
            fs.writeFile(path.join(__dirname, 'manOlder20', `${user.name}.txt`), JSON.stringify(user),
                err => console.log(err));
        }
    })
}

// createFiles(users)