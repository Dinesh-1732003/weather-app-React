const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
try {
    mongoose.connect('mongodb://127.0.0.1:27017/weatherapp', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("Db Connected");
} catch (e) {
    console.error("Error connecting to MongoDB:", e);
}

// Define the weather schema and model
const weatherSchema = new mongoose.Schema({
    location: String,
    temperature: Number,
    condition: String,
    icon: String,
    date: { type: Date, default: Date.now }
});

const Weather = mongoose.model('Weather', weatherSchema);
app.get('/weather', async (req, res) => {
    const location = req.query.location;
    console.log(location);
    try {
        const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=d7792c4b0e7a4204a9e91703240107&q=${location}`);
        const data = response.data;

        const weather = new Weather({
            location: data.location.name,
            temperature: data.current.temp_c,
            condition: data.current.condition.text,
            icon: data.current.condition.icon
        });
        console.log(weather);
        await weather.save();
        res.json(weather);
    } catch (error) {
        console.error("Error in GET /weather:", error.message);
        res.status(500).send(error.message);
    }
});


app.post('/weather', async (req, res) => {
    const { location } = req.body;
    console.log("Received data:", location);
    try {
        const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=d7792c4b0e7a4204a9e91703240107&q=${location}`);
        const data = response.data;

        const weather = new Weather({
            location: data.location.name,
            temperature: data.current.temp_c,
            condition: data.current.condition.text,
            icon: data.current.condition.icon
        });
        console.log(weather);
        await weather.save();
        res.json(weather);
    } catch (error) {
        console.error("Error in POST /weather:", error.message);
        res.status(500).send(error.message);
    }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
