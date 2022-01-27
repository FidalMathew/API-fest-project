const mongoose = require('mongoose');
require('dotenv').config();

// getting the DB URI from environment variables to connect to
// the MongoDB database
const dbURI = process.env.DB_URI;

// establishing connection with the MongoDB database
mongoose.connect(dbURI)
    .then(result => {
        // if connected successfully logging connected successfully
        console.log("Connected to database")
    })
    .catch(err =>{
        // logging the error
        console.log(err);
    })