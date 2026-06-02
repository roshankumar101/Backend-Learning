// Express.js Framework


// Introduction to Express.js
    // express js ek npm package hai
    // framework -> flow
    // manages everything from receiving the request and giving the response


// Setting up a basic Express Application
    // npm i express
    // import express from 'express'   X
    const express = require('express');
    const app = express();


// Middleware  
    // jab bhi server request accept krta hai waha se route ke beech pahuchne tak agar us request ko rok kr kuch perform krte h, ye element middleware kehlata hai 
    app.use(function(req, res, next){
        console.log("middleware called");
        next();
    })

    app.use(function(req, res, next){
        console.log("middleware called again");
        next();
    })


// Routing
// Request and response handling
    app.get('/', function(req, res){
        res.send("Home page URL");
    })

    app.get('/profile', function(req, res){
        res.send("Profile page URL");
    })

    app.get('/about', function(req, res, next){
        return next(new Error("Something went wrong!!"));   // ye error jayega console me
    })


// Error handling - express ke pass ek special route h
    app.use((err, req, res, next) => {
        console.error(err.stack)
        res.status(500).send('Error in About page');        // ye error jayega frontend me
    })




    app.listen(3000);


