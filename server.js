const express = require("express");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/test-internhsip");

const app = express();

const regSchema = mongoose.Schema({
  reg : String,
});

const RegModel = mongoose.model("reg247", regSchema, "reg247"); 

app.get('/all', async (req, res) => {
  try {
    const records = await RegModel.find()
          .limit
          .select("tag1 tag2");  
    
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch records' });
  }
});

app.listen(8001, () => {
  console.log("Server started at port localhost:8001");
})