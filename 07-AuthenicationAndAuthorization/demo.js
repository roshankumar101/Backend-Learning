const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const express = require('express');
const app = express();

app.use(cookieParser());



app.get('/', (req, res) => {

    // // setting up cookies
    // res.cookie('name', 'Roshan');        




    // // encrypt password
    // bcrypt.genSalt(10, function(err, salt) {
    //     bcrypt.hash('myPassword', salt, function(err, hash) {
    //         console.log(hash)
    //     });
    // });

    // // decrypt password
    // bcrypt.compare('myPassword', '$2b$10$YT6o38LEI02tS7H3eitJHudyVN/.xxxyni2J//pOF.mn21FXuOz8e', function(err, result) {
    //     console.log(result);
    // });




    // jwt Token
    const token = jwt.sign({email: "Roshan@gmai.com"}, "secret");
    res.cookie("token", token);
    res.send("Token generated");




    res.send("Hello");
})



app.get('/read', (req, res) => {
    // console.log(req.cookies);            // reading the cookies

    // decrypt the data
    let data = jwt.verify(req.cookies.token, "secret");
    console.log(data);


    res.send('read page');
})




app.listen(3000);