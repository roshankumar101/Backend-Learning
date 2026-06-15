const cluster = require('cluster');
const os = require('os');
const express = require('express');


const totalCPUs = os.availableParallelism();        // also write os.cpus().length


console.log(totalCPUs)

if(cluster.isPrimary){
    for(let i=0; i<totalCPUs; i++){
        cluster.fork();
    }
}
else{
    const app = express();

    app.get('/', (req, res) => {
        return res.json({ message : `Hello ${process.pid}`});
    })

    app.listen(3000, () => console.log("Started at port 3000"));
}