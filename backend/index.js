const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const router = require('./routes/index.js');


const app = express();


// ({ origin: 'http://localhost:3000' }); to set it to specified origin of client
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

const port = 8080;
app.listen(port, () => {
    console.log('Server is Listening on Port', port);
});

mongoose.connect('mongodb+srv://priyanshuchoudhary0104:Priyanshu0209@cape-mongodb.0xium03.mongodb.net/test')
    .then(() => console.log("connected"));

app.use(router);




// we need to set the proxy to frontend to 8080