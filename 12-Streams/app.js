const express = require('express');
const app = express();
const fs = require('fs');
const status = require('express-status-monitor');
const zlib = require('zlib');

app.use(status());

fs.createReadStream('./hello2.txt').pipe(
    zlib.createGzip().pipe(fs.createWriteStream('./sample.zip'))
);

app.get('/', (req, res) => {
    const stream = fs.createReadStream('./hello2.txt', 'utf-8');
    stream.on('data', (chunk) => res.write(chunk));
    stream.on('end', () => res.end());

})



// copy without stream -> consume more ram
// app.get('/', (req, res) => {
//     // fs.copyFile("hello2.txt", "hello.txt", function(err){
//     //     console.log(err)
//     //     console.log("Done");
//     // })
//     res.send("Hello while coping")
// })





app.listen(3000);