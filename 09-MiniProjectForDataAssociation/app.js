const express = require('express');
const app = express();
const path = require('path');


const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
app.use(cookieParser());

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userModel = require('./models/user');
const postModel = require('./models/post');


const isLoggedIn = (req, res, next) =>{
    if(req.cookies.token === '' || req.cookies.token == null) res.redirect('/login');
    else{
        let data = jwt.verify(req.cookies.token, 'secret');
        req.user = data;
        next();
    }
}

app.get('/', (req, res) => {
    res.render('index');
})

app.post('/register', async (req, res) => {
    let {username, name, email, age, password} = req.body;

    let user = await userModel.findOne({email});
    if(user) return res.status(500).send("User Already Registered!!");

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            let createdUser = await userModel.create({
                username,
                name,
                email,
                age,
                password: hash
            })

            let token = jwt.sign({email: email, userId:createdUser._id}, "secret");
            res.cookie('token', token);
            res.redirect('/profile');
        })
    })
})



app.get('/login', (req, res) => {
    res.render('login');
})

app.post('/login', async (req, res) => {
    let {email, password} = req.body;

    let user = await userModel.findOne({email});
    if(!user) return res.status(500).send("Something went Wrong!!");

    bcrypt.compare(password, user.password, (err, result) => {
        if(result){
            let token = jwt.sign({email: email, userId: user._id}, "secret");
            res.cookie('token', token);
            res.status(200).redirect('/profile');
        }
        else res.redirect('/login');
    });
    
})


app.get('/logout', (req, res) => {
    res.cookie('token', '');
    res.redirect('/login');
})


app.get('/profile', isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({email: req.user.email}).populate('posts');

    res.render('profile', {user});
    

})


app.get('/like/:id', isLoggedIn, async (req, res) => {
    let post = await postModel.findOne({_id: req.params.id}).populate('user');

    if(post.likes.indexOf(req.user.userId) === -1){
        post.likes.push(req.user.userId);
    }
    else{
        post.likes.splice(post.likes.indexOf(req.user.userId), 1)
    }
    await post.save();

    res.redirect('/profile');

})


app.get('/edit/:id', isLoggedIn, async (req, res) => {
    let post = await postModel.findOne({_id: req.params.id});

    res.render('edit', {post});
})

app.post('/update/:id', isLoggedIn, async (req, res) => {
    let post = await postModel.findOneAndUpdate({_id: req.params.id}, {content: req.body.content});

    res.redirect('/profile');
})


app.post('/post', isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({email: req.user.email});
    let {content} = req.body;

    let createdPost = await postModel.create({
        user: user._id,
        content,
    })

    user.posts.push(createdPost._id);
    await user.save();

    res.redirect('/profile');
})

res.redirect('/login')


app.listen(3000);
