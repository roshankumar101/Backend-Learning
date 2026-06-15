const http = require('http');
const fs = require('fs');

const myServer = http.createServer((req, res) => {
    // console.log(req);
    const log = `${Date.now()}: New Req Coming\n`;

    fs.appendFile("log.txt", log, (err, data) => {
        res.end("Hello");
    })
})


myServer.listen(8000, ()=> console.log("Server Started!!"));