const express = require("express");
const app = express();
const users = require("./MOCK_DATA.json");
const config = require("./config"); // for PORT number
const PORT = config.app;
const fs = require("fs");
const mongoose = require('mongoose');
const { triggerAsyncId } = require("async_hooks");

mongoose.connect('mongodb://127.0.0.1:27017/backendLearning').then(
    () => { console.log("MongoDB Connected"); }
).catch((error) => { console.log("Error occcured " , error); })


//SCHEMA
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    jobTitle: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true
    }
})

const user = mongoose.model('user', userSchema);

app.use(
    express.urlencoded({
        extended: false,
    })
);

app.use((request, response, next) => {
    fs.writeFile('./MiddleWareLog.txt',
        `Requested on -> ${Date.now()} : Method -> ${request.method}`, () => { //logged the middle ware details
            console.log("Data Logged");
        })
    next() // MW1 -> MW2 
})

app.use((request, response, next) => {
    console.log("MW -> 2")
    next() // MW2 -> other part of the server
})


app.get("/api/users", (request, response) => {
    response.setHeader('X-Author', 'Yash Tiwari')
    return response.json(users);
});

app.get("/users", (request, response) => {
    const html = `
        <ul>
            ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
        </ul>
        `;
    return response.send(html);
});

app.route("/api/users/:id")
    .get((request, response) => {
        const id = Number(request.params.id);
        const user = users.find((user) => user.id === id);
        return response.json(user);
    })
    .post((request, response) => {
        const id = Number(request.params.id);
        const user = users.find((user) => user.id === id);
        return response.json(user);
    })
    .patch((request, response) => {
        return response.json({
            status: "pending",
        });
    })
    .delete((request, response) => {
        return response.json({
            status: "pending",
        });
    });

app.post("/api/users", (request, response) => {
    const body = request.body;
    users.push({ ...body, "id": users.length + 1 });
    console.log(body);
    fs.writeFile("./MOCK_DATA.json", JSON.Stringify(users), (error, data) => {
        if (users) {
            console.log("Got some data");
        }
        return response.status(201).json({
            dataGot: true,
        });
    });
});

app.listen(PORT, () => {
    console.log("Server initialized");
});

