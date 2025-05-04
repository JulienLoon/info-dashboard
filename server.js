require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000; // Hardcoded poort zoals gevraagd

// Statische bestanden serveren (zoals HTML, JS, CSS)
app.use(express.static('public'));

// API endpoint voor het weer
app.get('/api/weather', async (req, res) => {
  const { lat, lon } = req.query;
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!lat || !lon) {
    return res.status(400).json({ error: 'Latitude and longitude are required' });
  }

  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
    res.json(response.data);
  } catch (error) {
    console.error('Weather API error:', error.message);
    res.status(500).send("Error retrieving weather data");
  }
});

// Server starten
app.listen(port, () => {
  console.log(`Server draait op http://localhost:${port}`);
});
