const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();   // loads variables from .env

const app = express();
app.use(express.json());      //middleware to parse JSON

//import routes
const contactRoutes = require('./server/routes/contact.routes');

//Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URL)
.then(() =>
     console.log('MongoDB connected successfully'))
.catch(error =>
    console.error('MongoDB connection error:', error));

    //Use Routes
app.use('/api/contacts', contactRoutes);

//Test Route
app.get("/",(req, res)=>{
res.send("Welcome to to My Portfolio application")
});


//Test Server
app.listen(3000);
console.log("Server running at http://localhost:3000/");

module.exports = app; 