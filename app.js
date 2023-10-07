const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;
const host = 'localhost';

app.set('view engine', 'ejs');

app.get('/say', async (req, res) => {
    const keyword = req.query.keyword;
    if (!keyword) {
        return res.status(400).send('Missing "keyword" query parameter.');
    }

    const azFuncURL = 'https://http-echo-function.azurewebsites.net/api/echo?code=OG19HHX4SSqQLtjkavsTq2_aWMnDXDArwIl1jFHCoV6nAzFuABZQCQ==';

    try {
        const response = await axios.get(azFuncURL, {
            params: {
                keyword: keyword,
            },
        });

        res.status(response.status).send(response.data);
    } catch (error) {
        console.error('Error calling Azure Function:', error);
        res.status(500).send('Error calling Azure Function');
    }
});

app.listen(port, host, () => {
    console.log(`Server is running on ${host}:${port}`);
});
