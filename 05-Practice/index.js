const express = require('express');
const app = express();
const path = require('path');
const fs = require('node:fs');


// setting up parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// setting up public static files
app.use(express.static(path.join(__dirname, 'public')));


// setup ejs as a view engine
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    fs.readdir(`./files`, function(err, files){
        res.render("index", {files: files});
    })
});



app.get('/file/:filename', function(req, res){
    fs.readFile(`./files/${req.params.filename}`, 'utf-8', function(err, filedata){
        res.render('show', {title: req.params.filename, filedata: filedata})
    })
});

app.get('/edit/:filename', function(req, res){
    res.render('edit', {filename: req.params.filename})
});



app.post('/create', function(req, res){
    // console.log(req.body);
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.description, function(err){
        res.redirect('/');
        console.error(err);
    })
})

app.post('/edit', function(req, res){
    fs.rename(`./files/${req.body.prev}`, `./files/${req.body.new}`, function(err){
        console.error(err);
        res.redirect("/");
    })
})




// // dynamic routing
// app.get('/profile/:username', function(req, res){
//     res.send(`Welcome ${req.params.username}`);     // req.params -> : ke pehle wala part
// });


// app.get('/profile/:username/:age', function(req, res){
//     res.send(`Welcome ${req.params.username} your age is ${req.params.age}`);
// });





app.listen(3000, function(){
    console.log("Its running");
});