const express = require('express');
const api = express();
const mongoose = require('mongoose');

//? Routes:
api.get('/', (req, res, next) => {
    console.log(`Home route called`);
    res.send(`Home route`)
});

const port = 3000;
api.listen(port, () => console.log(`Listening on port ${port}`));