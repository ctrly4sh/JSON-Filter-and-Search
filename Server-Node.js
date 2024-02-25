//USING Node

const http = require("http");
const url = require('url');
const fs = require("fs")
const config = require('./config');

const node_server = http.createServer((request, response) => {
    if (request.url === "/favicon.ico") return response.end();
    const serverLog = `Server requested on :  -> ${Date.now()} : Method -> ${request.method} :  URL -> ${request.url
        }\n`;
    const serverUrl = url.parse(request.url, true); //passing true for query string 
    console.log(serverUrl);
    fs.appendFile("ServerLogFile.txt", serverLog, "utf-8", (error) => {
        switch (serverUrl.pathname) {
            case "/":
                response.end(
                    `This is the landing page, welcome ${serverUrl.pathname}`
                );
                break;
            case "/search":
                response.end("Search section");
                break;
            case "/about":
                const username = serverUrl.query.name;
                console.log(username);
                if (username) {
                    response.end(`Welcome ${username}`);
                } else {
                    response.end("Hello wanna about us ");
                }
                break;
            default:
                response.end("Sorry page not found");
        }
        console.log(`Exception => ${error}`);
    });
});

node_server.listen(config.port, () => {
    console.log("Server Initialized");
});
