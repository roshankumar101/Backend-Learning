const express = require('express');
const app = express();

const userModel = require('./usermodel');

app.get('/', (req, res) => {
    res.send('Hello')
})



app.get('/create', async (req, res) => {

    const createdUser = await userModel.create({
        name: 'Roshan Kumar',
        username: 'roshan',
        email: 'roshan@gmail.com',
        age: 20
    })

    res.send(createdUser);
})



app.get('/update', async (req, res) => {

    const updatedUser = await userModel.findOneAndUpdate({username: "roshan"}, {name: 'Roshan Mandal'}, {new: true});

    res.send(updatedUser);
})


app.get('/readAll', async (req, res) => {
    const users = await userModel.find();

    res.send(users);
})


app.get('/read', async (req, res) => {
    const particularUser = await userModel.find({username: 'roshan'})       // return [{}] | []
    // const particularUser2 = await userModel.findOne({username: 'roshan'})       // return {} | null

    res.send(particularUser);
})


app.get('/delete', async (req, res) => {
    const deletedUser = await userModel.findOneAndDelete({username: 'niraj'});

    res.send(deletedUser);
})



app.listen(3000);