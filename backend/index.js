const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// const Router = require('router');
const router = require('./routes/index.js');


const app = express();
// const router = express.Router();


// ({ origin: 'http://localhost:3000' }); to set it to specified origin of client
app.use(cors());
app.use(express.json());

const port = 8080;
app.listen(port, () => {
    console.log('Server is Listening on Port', port);
});

mongoose.connect('mongodb+srv://priyanshuchoudhary0104:Priyanshu0209@cape-mongodb.0xium03.mongodb.net/test')
    .then(() => console.log("connected"));

app.use(router);




// we need to set the proxy to frontend to 8080