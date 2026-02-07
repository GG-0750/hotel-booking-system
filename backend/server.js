require("dotenv").config();

//ROUTERS y'all


const Hotel = require("./models/Hotel");  //mongoose model // represents hotels collection in MongoDB -> USED TO TALK TO DB
const Booking = require('./models/Booking');
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));
  
const cors = require("cors");
const express = require("express");

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

app.post("/api/book", async (req, res) => {
  try {
    const { hotelId, customerName } = req.body;

    const newBooking = new Booking({ 
      hotelId: hotelId, 
      customerName: customerName 
    });

    await newBooking.save();
    res.status(201).json({ message: "Booking successful!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error: Could not complete booking" });
  }
});

// GET route to fetch all bookings from hotelDB
app.get("/api/my-bookings", async (req, res) => {
  try {
    // .populate('hotelId') automatically fetches the Hotel name/price 
    // using the ID saved in the booking!
    const bookings = await Booking.find().populate('hotelId');
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Server error fetching bookings" });
  }
});


app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});

