// ---Express---

const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// app.get(); //get info
// app.post(); //create info
// app.put(); // full update info
// app.patch(); //partially renew info
// app.delete(); //delete info

const PORT = 5000;

const users = [
    {
        name: "Oleg",
        age: 20,
        gender: 'male'
    },
    {
        name: "Anton",
        age: 22,
        gender: 'male'
    },
    {
        name: "Anna",
        age: 28,
        gender: 'female'
    },
    {
        name: "Olga",
        age: 27,
        gender: 'female'
    },
    {
        name: "Igor",
        age: 29,
        gender: 'male'
    },
    {
        name: "Ira",
        age: 30,
        gender: 'female'
    }
]

app.get('/users', (req, res) => {
    res.status(200).json(users);
});

app.get('/users/:userId', (req, res) => {
    // console.log(req.params);
    const {userId} = req.params;
    // console.log(userId);

    // console.log(typeof userId);
    const user = users[+userId];

    res.json(user);
});

app.post('/users', (req, res) => {
    const body = req.body
    users.push(body);
    // console.log(body);
    res.status(201).json({
        message: 'User created!'
    })
});

app.put('/users/:userId', (req, res) => {
    const {userId} = req.params;
    const updatedUsers = req.body;

    users[+userId] = updatedUsers;

    res.status(200).json({
        message: 'User updated',
        data: users[+userId]
    })
});

app.delete('/users/:userId', (req, res)=>{
    const {userId} = req.params;

    users.splice(+userId, 1);

    res.status(200).json({
        message:'User deleted!'
    })

});

app.listen(PORT, () => {
    console.log(`Server has started on PORT ${PORT}⛷🏂🏄`);
});

app.get('/welcome', (req, res) => {
    res.send('WELCOME!!!');
    res.end();
});