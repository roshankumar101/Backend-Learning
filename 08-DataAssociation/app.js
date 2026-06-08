const express = require('express');
const app = express();
const userModel = require('./models/user');
const postModel = require('./models/post');


app.get('/', (req, res) => {
    res.send("Hello");
})


app.get('/create', async (req, res) => {
    let createdUser = await userModel.create({
        username: "Roshan",
        email: "roshan@gmail.com",
        age: 20,
    })

    res.send(createdUser);
})



app.get('/post/create', async (req, res) => {
    // console.log((await userModel.findOne({username: 'Roshan'}))._id)
    let createdPost = await postModel.create({
        postdata: "PS 5",
        user: (await userModel.findOne({username: 'Roshan'}))._id,
        date: Date.now()
    })


    const user = await userModel.findOne({username: 'Roshan'});
    user.posts.push(createdPost._id);
    await user.save();


    res.send(createdPost);
})



app.listen(3000);