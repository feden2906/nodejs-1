// Вам потрібно реалізувати мінімум 3 строрінки.
// 1) Реєстрація
// 2) Логінація.
// 3) Список всіх юзерів.
//
//     Створити файлик з юзерами, який буде виступати в ролі бази данних.
//
//     При реєстрації юзер вводин логін та пороль і ви його данні дописуєте у файлик.
//     Якщо такий мейл вже є, то видаємо помилку.
//
//     При логінації юзер так само ввоить мейл та пароль і вам необхідно знайти юзера в файлі.
//     Якщо такий мейлик з таким паролем є, то привіти юзера на платформі показати інформацію про нього
//     та кнопочку, яка перекине нас на список всіх юзерів.
//     В інакшому випадку сказати, що необхідно реєструватись.
//
//     І відображення всіх юзерів це відповідно просто виведення списку вісх юзерів.
//
//     При реєстрації мейли не можуть повторюватись

const express = require('express');
const expressHandleB = require('express-handlebars');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const app = express();

app.listen(3000, () => {
    console.log('App listen localhost:3000');
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'static')));

app.set('view engine', '.hbs');
app.engine('.hbs', expressHandleB({defaultLayout: false}));
app.set('views', path.join(__dirname, 'static'));


async function getContent() {
    const data = await fsPromises.readFile(path.join(__dirname, 'usersDataBase.json'))
        .catch((err) => console.error(err));
    return JSON.parse(data.toString());
}

//------------login form-------------
app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', async (req, res) => {
    const {login, password} = req.body;
    const users = await getContent();

    const findUser = users.find(user => user.login === login && user.password === password);

    if (findUser) {
        const id = users.indexOf(findUser);
        res.redirect(`users/${id}`);
        return;
    }

    res.send('Need to register or check your login and password');
});

//--------register form-------------------
app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', async (req, res) => {
    const {name, age, login, password} = req.body;
    const users = await getContent();

    const findUser = users.find(user => user.login === login);

    if (findUser) {
        res.render('error');
        return;
    }

    users.push({name, age, login, password, id: users.length + 1});
    await fs.writeFile(path.join(__dirname, 'usersDataBase.json'), JSON.stringify(users),
        (err1) => {
            if (err1) console.log(err1);
        });

    res.redirect('/users')
});

//-------users ------------
app.get('/users', async (req, res) => {
    const users = await getContent();
    res.render('users', {users});
});

//-------user --------
app.get('/users/:id', async (req, res) => {
    const {params: {id}} = req;
    const users = await getContent();
    res.render('user', {user: users[id]});
})





