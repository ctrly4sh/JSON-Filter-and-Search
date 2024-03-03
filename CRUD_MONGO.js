const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 8080

app.get('/', (request, response) => {
    console.log("Server called");
    return response.send("Welcome to the main page")
})

//Connection with mongo DB
const connect = mongoose.connect('mongodb://127.0.0.1:27017/LearningBackend-01');

connect.then(() => console.log("Mongo DB connected"));

//Schema of the database
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    }
},
{timestamps : true}
)

const User = mongoose.model('user', userSchema);

app.use(express.urlencoded({ extended: false }))


app.get("/users" , async (request , response)=>{
    const allEntries = await User.find({})
    const html = `
    ${allEntries.map((user) => `<li>${user.firstName}`)}
    `
    return response.send(html)
})

app.post('/api/users', async (request, response) => {
    const body = request.body;

    if (!body || !body.firstName || !body.lastName || !body.email) {
        return response.status(400).json({ message: "Fields are missing all fields are required" })
    }
    
    const result = await User.create({
        firstName : body.firstName,
        lastName : body.lastName,
        email : body.email,
    });

    console.log(result);
    return response.status(201).json({ Message : "success"})

})

app.listen(8080, () => { `Server stareted on port ${PORT}` })