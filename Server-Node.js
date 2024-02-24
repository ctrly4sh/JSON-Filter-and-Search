//USING NODE

//Added Current time for getting the exact log of the server
const http = require("http");
const fs = require("fs");

const node_server = http.createServer((request, response) => {
  const logTime = new Date();
  const Time = logTime.toLocaleTimeString();
  const serverLog = `Request received on => ${Time} : ${request.url}\n`;
  fs.appendFile("ServerLogFile.txt", serverLog, "utf-8", (error) => {
    switch (request.url) {
        case "/" : response.end("Landing page")
        break
        case "/search" : response.end("Search section")
        break
        case "/about" : response.end("About us")
        break
        default : response.end("Sorry page not found")
    }
    console.log(`Exception => ${error}`);
  });
});

node_server.listen(8000, () => {
  console.log("Server Initialized");
});
