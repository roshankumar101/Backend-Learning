const http = require('http');
const fs = require('fs');
const url = require('url');

const myServer = http.createServer((req, res) => {
    if(req.url === '/favicon.ico') return res.end();

    const log = `${Date.now()}: ${req.url}: New Req Coming\n`;

    const myUrl = url.parse(req.url, true);
    // console.log(myUrl);

    fs.appendFile("log.txt", log, (err, data) => {
        switch(myUrl.pathname){
            case '/': 
                res.end(`Home Page, Hello ${myUrl.query.name}, age: ${myUrl.query.age}`);
                break;
            case '/about':
                res.end(`About page, Hello ${myUrl.query.name}, age: ${myUrl.query.age}`);
                break;
            default:
                res.end("404 Page Not Found");
        }
    })
});



myServer.listen(8000, ()=> console.log("Server started"));