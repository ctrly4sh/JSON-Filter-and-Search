const http = require('http');
const express = require('express');
const app = express();

app.get('/' , (request , response) => {
    return response.send("Hello from Landing page")
})

app.get('/about' , (request,response)=> {
    return response.send('Welcome to about page' + "hey" + request.query.name)
})

const firstServer = http.createServer(app)
app.listen(8000,()=>{
    console.log("Server Started");
})