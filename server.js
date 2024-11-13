const express = require("express");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/test-internhsip");

const app = express();



app.get('/all', async (req, res) => {
    res.json({
        message : "node started"
    })
});

app.listen(8001, () => {
  console.log("Server started at port localhost:8001");
});
