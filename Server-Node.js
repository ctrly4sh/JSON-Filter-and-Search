//USING NODE

//Added Current time for getting the exact log of the server 
const http = require("http");
const fs = require('fs'); 

const node_server = http.createServer((request,response)=>{
    const logTime = new Date();
    const Time = logTime.toLocaleTimeString();
    const serverLog = `Request received on => ${Time}\n`;
    fs.appendFile("ServerLogFile.txt",serverLog , "utf-8" , (error)=>{
        console.log(`Exception => ${error}`)
    })
    response.end("Node says hii")
})

node_server.listen(8000,()=>{
    console.log("Server Initialized");
})