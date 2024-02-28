const express = require("express");
const app = express();
const users = require("./MOCK_DATA.json");
const config = require("./config"); // for PORT number
const PORT = config.app;
const fs = require("fs");

console.log(PORT); // 6969


app.use(
    express.urlencoded({
        extended: false,
    })
);

app.use((request, response, next) => {
    fs.writeFile('./MiddleWareLog.txt',
    `Requested on -> ${Date.now()} : Method -> ${request}`,()=>{
        console.log("Data Logged");
    })
next() // MW1 -> MW2 
})

app.use((request, response, next) => {
    console.log("MW -> 2")
    next() // MW2 -> other part of the server
})

//ROUTES
app.get("/api/users", (request, response) => {
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
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (error, data) => {
        if (users) {
            console.log("Got some data");
        }
        return response.json({
            dataGot: true,
        });
    });
});

app.listen(PORT, () => {
    console.log("Server initialized");
});

