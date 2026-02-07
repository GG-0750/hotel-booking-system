const Hotel = require("./models/Hotel");  //mongoose model // represents hotels collection in MongoDB -> USED TO TALK TO DB
require("dotenv").config();

const mongoose = require("mongoose");

mongoose.connect(process.env.mongodb_url)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const express = require("express");
const cors = require("cors");
const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Backend is working");
});

          //js variable - hotels - holds the data returned from DB
app.get("/hotels", async (req, res) => {  //holds the data returned from DB
  const hotels = await Hotel.find();
  res.json(hotels);
});

app.get("/hotels/search", async (req, res) => {
  const { location } = req.query;

  const hotels = await Hotel.find({
    location: new RegExp(location, "i")
  });

  res.json(hotels);
});


app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});

