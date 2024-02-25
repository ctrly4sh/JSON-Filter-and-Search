//USING Express

const express = require('express');
const fs = require('fs');

const app = express();

app.use((req, res, next) => {
    const serverLog = `Server requested on :  -> ${Date.now()} : Method -> ${req.method} :  URL -> ${req.url}\n`;
    console.log(serverLog);
    fs.appendFile('ServerLogFile.txt', serverLog, 'utf-8', (error) => {
        if (error) {
            console.log(`Exception => ${error}`);
        }
    });
    next();
});


app.get('/', (req, res) => {
    res.send('This is the landing page, welcome to Express');
});

app.get('/search', (req, res) => {
    res.send('Search section');
});

app.get('/about', (req, res) => {
    const username = req.query.name;
    if (username) {
        res.send(`Welcome ${username}`);
    } else {
        res.send('Hello, want to know about us');
    }
});

app.use((req, res) => {
    res.status(404).send('Sorry, page not found');
});

const PORT = 7000;
app.listen(PORT, () => {
    console.log(`Server initialized on port ${PORT}`);
});
