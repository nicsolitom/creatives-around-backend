const express = require('express');
const api = express();
const mongoose = require('mongoose');

const port = 3000;
api.listen(port, () => console.log(`Listening on port ${port}`));