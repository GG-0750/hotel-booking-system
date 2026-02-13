require("dotenv").config();

//ROUTERS y'all


const Hotel = require("./models/Hotel");  //mongoose model // represents hotels collection in MongoDB -> USED TO TALK TO DB
const Booking = require('./models/Booking');
const mongoose = require("mongoose");
const Sentiment = require("sentiment");
const sentiment = new Sentiment();
const { HfInference } = require('@huggingface/inference');
const hf = new HfInference(process.env.HUGGINGFACE_TOKEN);


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

app.get("/hotels/:id/sentiment", async (req, res) => {
  const hotel = await Hotel.findById(req.params.id);
  
  if (!hotel || !hotel.reviews) {
    return res.json({ error: "No reviews found" });
  }
  
  let totalScore = 0;
  let analyzed = [];
  
  hotel.reviews.forEach(review => {
    const result = sentiment.analyze(review);
    totalScore += result.score;
    analyzed.push({
      review: review,
      score: result.score,
      sentiment: result.score > 0 ? "Positive" : result.score < 0 ? "Negative" : "Neutral"
    });
  });
  
  const avgScore = totalScore / hotel.reviews.length;
  
  res.json({
    hotelName: hotel.name,
    averageScore: avgScore,
    overallSentiment: avgScore > 0 ? "Positive" : avgScore < 0 ? "Negative" : "Neutral",
    reviews: analyzed
  });
});

app.get("/hotels/:id/sentiment", async (req, res) => {
  const hotel = await Hotel.findById(req.params.id);
  
  if (!hotel || !hotel.reviews) {
    return res.json({ error: "No reviews found" });
  }
  
  let totalScore = 0;
  let analyzed = [];
  
  hotel.reviews.forEach(review => {
    const result = sentiment.analyze(review);
    totalScore += result.score;
    analyzed.push({
      review: review,
      score: result.score,
      sentiment: result.score > 0 ? "Positive" : result.score < 0 ? "Negative" : "Neutral"
    });
  });
  
  const avgScore = totalScore / hotel.reviews.length;
  
  res.json({
    hotelName: hotel.name,
    averageScore: avgScore,
    overallSentiment: avgScore > 0 ? "Positive" : avgScore < 0 ? "Negative" : "Neutral",
    reviews: analyzed
  });
});

app.post("/hotels/:id/review", async (req, res) => {
  const { review } = req.body;
  
  const hotel = await Hotel.findById(req.params.id);
  
  if (!hotel) {
    return res.status(404).json({ error: "Hotel not found" });
  }
  
  if (!hotel.reviews) {
    hotel.reviews = [];
  }
  
  hotel.reviews.push(review);
  await hotel.save();
  
  res.json({ message: "Review added", hotel });
});

app.get("/recommendations/:userId", async (req, res) => {
    try {
      const userBookings = await Booking.find({ customerName: req.params.userId }).populate('hotelId');
      
      if (userBookings.length === 0) {
        const topHotels = await Hotel.find().sort({ rating: -1 }).limit(3);
        return res.json(topHotels);
      }
      
      // Get descriptions of booked hotels
      const bookedHotels = userBookings.map(b => b.hotelId);
      const bookedDescriptions = bookedHotels
        .filter(h => h.description)
        .map(h => h.description)
        .join(". ");
      
      if (!bookedDescriptions) {
        const topHotels = await Hotel.find().sort({ rating: -1 }).limit(3);
        return res.json(topHotels);
      }
      console.log("🤖 Calling HuggingFace API for user preferences...");
      // Get embedding for user's preference
      const userEmbedding = await hf.featureExtraction({
        model: 'sentence-transformers/all-MiniLM-L6-v2',
        inputs: bookedDescriptions
      });
      
      // Get all hotels not booked
      const bookedIds = bookedHotels.map(h => h._id.toString());
      const allHotels = await Hotel.find({
        _id: { $nin: bookedIds },
        description: { $exists: true, $ne: null }
      });
      
      // Calculate similarity for each hotel
      const hotelScores = await Promise.all(
        allHotels.map(async (hotel) => {
          console.log(`🤖 Getting embedding for: ${hotel.name}`);
          const hotelEmbedding = await hf.featureExtraction({
            model: 'sentence-transformers/all-MiniLM-L6-v2',
            inputs: hotel.description
          });
          
          // Calculate cosine similarity
          const similarity = cosineSimilarity(userEmbedding, hotelEmbedding);
          
          return { hotel, similarity };
        })
      );
      
      // Sort by similarity and get top 3
      const recommendations = hotelScores
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, 3)
        .map(item => item.hotel);
      console.log("✅ HuggingFace recommendations generated successfully!");
      res.json(recommendations);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to get recommendations" });
    }
});

  // Cosine similarity function
  function cosineSimilarity(vecA, vecB) {
    const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
    const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
    return dotProduct / (magnitudeA * magnitudeB);
  }


app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});

