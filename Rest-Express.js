const express = require("express");
const app = express();
const users = require("./MOCK_DATA.json");
const config = require("./config"); // for PORT number
const PORT = config.app;
const fs = require("fs");

app.use(
    express.urlencoded({
        extended: false,
    })
);

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

app
    .route("/api/users/:id")
    .get((request, response) => {
        const id = Number(request.params.id);
        const user = users.find((user) => user.id === id);
        return response.json(user);
    })
    .post((request, response) => {
        //Edit user with ide
        return response.json({
            status: "pending",
        });
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

