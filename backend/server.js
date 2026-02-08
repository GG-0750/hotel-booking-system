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


// Updated GET route to match frontend call
app.get("/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate({
        path: 'hotelId',
        model: 'Hotel' 
      })
      .exec();

    console.log("DEBUG: First Booking Hotel Name ->", bookings[0]?.hotelId?.name);
    res.json(bookings);
  } catch (error) {
    console.error("Populate Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});


// DELETE route to cancel a booking
app.delete("/bookings/:id", async (req, res) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({ message: "Booking cancelled successfully" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ message: "Server error during cancellation" });
  }
});

app.get("/bookings", async (req, res) => {
  try {
    // This looks at the 'hotelId' field and fetches the full Hotel data
    const bookings = await Booking.find().populate('hotelId').exec();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching detailed bookings" });
  }
});


app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});

