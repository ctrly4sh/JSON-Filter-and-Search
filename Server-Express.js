const express = require("express");
const fs = require("fs");

const app = express();

app.use((request, response, next) => {
    const log_time = new Date();
    const formatted_time = log_time.toLocaleTimeString();
    const server_log = `Request received on => ${formatted_time}\n`;
    fs.appendFile("log.txt", server_log, (error) => {
        if (error) {
            console.log(`The error is ${error}`);
        }
        next();
    });
});

app.get("/", (request, response) => {
    response.send("Wave from Server");
});

app.listen(8000, () => {
    console.log("Server initialized with Express");
});