const http = require('http');
const url = require('url');
const https = require('https');
require('dotenv').config();

const API_KEY = process.env.API_KEY;

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    const query = url.parse(req.url, true).query;
    const city = query.city;

    if (!city) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'City parameter required' }));
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

    https.get(apiUrl, (apiRes) => {
        let data = '';

        apiRes.on('data', (chunk) => {
            data += chunk;
        });

        apiRes.on('end', () => {
            res.writeHead(apiRes.statusCode);
            res.end(data);
        });
    }).on('error', (error) => {
        res.writeHead(500);
        res.end(JSON.stringify({ error: 'Failed to fetch weather data' }));
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
