const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const dbURL = "mongodb+srv://venkadesh:tce@cluster0.gsdc6j5.mongodb.net/?retryWrites=true&w=majority";

        mongoose.set('strictQuery', false);

        mongoose.connect(dbURL);
    } catch (err) {
        console.log(`Error: ${err}`);
    }
};

module.exports = connectDB;