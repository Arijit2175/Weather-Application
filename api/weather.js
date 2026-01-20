const https = require('https');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const { city } = req.query;

    if (!city) {
        res.status(400).json({ error: 'City parameter required' });
        return;
    }

    const API_KEY = process.env.API_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

    https.get(apiUrl, (apiRes) => {
        let data = '';

        apiRes.on('data', (chunk) => {
            data += chunk;
        });

        apiRes.on('end', () => {
            res.status(apiRes.statusCode).send(data);
        });
    }).on('error', (error) => {
        res.status(500).json({ error: 'Failed to fetch weather data' });
    });
};
