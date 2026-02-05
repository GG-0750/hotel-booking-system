const express = require("express");

const app = express();

const PORT = 5000;

app.get("/", (req, res) => {
  res.send("Backend is working");
});

const hotels = [
  { id: 1, name: "Taj Mahal Palace", city: "Mumbai", price: 15000, rating: 4.8, imageURL: "https://example.com/taj.jpg" },
  { id: 2, name: "The Oberoi Udaivilas", city: "Udaipur", price: 20000, rating: 4.9, imageURL: "https://example.com/udai.jpg" },
  { id: 3, name: "ITC Grand Chola", city: "Chennai", price: 12000, rating: 4.7, imageURL: "https://example.com/chola.jpg" },
  { id: 4, name: "The Leela Palace", city: "Bengaluru", price: 18000, rating: 4.8, imageURL: "https://example.com/leela.jpg" },
  { id: 5, name: "JW Marriott", city: "Pune", price: 10000, rating: 4.5, imageURL: "https://example.com/marriott.jpg" }
];

app.get("/hotels", (req, res) => {  //hotels endpoint to return the list of hotels
  res.json(hotels);
});


app.get("/hotels/search", (req, res) => {  //search endpoint to filter hotels based on query parameters
  const query = req.query.q;

  if (!query) {
    return res.json(hotels);
  }

  const filteredHotels = hotels.filter(hotel =>
    hotel.name.toLowerCase().includes(query.toLowerCase()) ||
    hotel.city.toLowerCase().includes(query.toLowerCase())
  );

  res.json(filteredHotels);
});


app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
