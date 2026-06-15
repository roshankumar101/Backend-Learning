const express = require('express');
const app = express();


app.get('/', (req, res) => {
    return res.json({ message : `Hello ${process.pid}`});
})



app.listen(3000);