const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const recruiterRoutes = require('./routes/recruiterFeebackRoutes');
const parentsRoutes = require('./routes/parentsFeedbackRoutes');
const courseExitSurvey = require('./routes/courseExitSurveyRoutes');
const employerFeedback = require('./routes/employerFeedbackRoutes');

const connectDB = require('./db/db');

connectDB();

app.use(express.json());
app.use(bodyParser.json());

app.use('/recruiterFeedback', recruiterRoutes);
app.use('/parentsFeedback', parentsRoutes);
app.use('/courseExitSurvey', courseExitSurvey);
app.use('/employerFeedback', employerFeedback);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started and listening on port: ${PORT}`);
});