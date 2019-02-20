
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const sauceRoutes = require('./routes/sauce');
const userRoutes = require ('./routes/user');
const path = require('path');

const app = express();

mongoose.connect('mongodb+srv://mongo:OOwl7SD3tDCQh2by@cluster0-jqp4b.mongodb.net/test?retryWrites=true').then( () =>{
    console.log('Successfully connected to mongoDB Atlas');
}

).catch( (error) => {
    console.log('Unable to connect to mongoDB');
    console.error(error)
}   
);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);








module.exports = app;