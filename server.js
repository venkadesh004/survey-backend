const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const recruiterRoutes = require('./routes/recruiterFeebackRoutes');
const connectDB = require('./db/db');

connectDB();

app.use(express.json());
app.use(bodyParser.json());

app.use('/recruiterFeedback', recruiterRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started and listening on port: ${PORT}`);
});