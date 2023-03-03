const express = require('express');
const fsService = require('./fs.servises')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/users', async (req, res) => {
    const users = await fsService.reader();
    res.json(users)
});

app.post('/users', async (req, res) => {
    const {name, age, gender} = req.body;

    if (!name || name.length < 2) {
        res.status(400).json({
            message: 'write name'
        });
    }
    if (!age || Number.isInteger(age) || Number.isNaN(age)) {
        res.status(400).json('write correct age');
    }
    if (!gender || gender !== 'male' || gender !== 'female') {
        res.status(400).json('write correct gender');
    }
    const users = await fsService.reader();

    const newUser = {id: users[users.length - 1]?.id + 1 || 1, name, age, gender};

    users.push(newUser);
    await fsService.writer(users);

    res.status(201).json(newUser);

});

const PORT = 5000;

app.listen(PORT, () => {
    console.log('Server has started on PORT ${PORT}✈');
});
