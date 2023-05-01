const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const dbURL = "mongodb+srv://venkadesh:tce@cluster0.gsdc6j5.mongodb.net/?retryWrites=true&w=majority";

        mongoose.set('strictQuery', false);

        mongoose.connect(dbURL, (err) => {
            if (err) {
                console.log(`Error ${err.message}`);
                return;
            } else {
                console.log(`MongoDB connection Successful`);
                return;
            }
        });
    } catch (err) {
        console.log(`Error: ${err}`);
    }
};

module.exports = connectDB;