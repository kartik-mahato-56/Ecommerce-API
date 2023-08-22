const mongoose = require('mongoose')
const dotenv = require('dotenv')


exports.connectDb = async () => { 
    try {
        const dbURL = process.env.DB_URL;
        
        const DB_OPTIONS = {
            user: process.env.DB_USERNAME,
            pass : process.env.DB_PASSWORD,
            authSource:"admin",
            dbName  : process.env.DB_NAME  
        };
        await mongoose.connect(dbURL, DB_OPTIONS);
        console.log("Database connected successfully");
    } catch (err) {
        console.error(err);
    }
}
