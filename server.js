const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const csv = require("fast-csv");
const multer = require('multer');

const {uploadDataCourseExitSurvey} = require('./controllers/courseExitSurveyControllers');

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "./download/");
  },    
  filename: (req, file, callBack) => {
    callBack(
      null,
      'courseExitSurvey.csv'
    );
  },
});

var upload = multer({
    storage: storage,
});

const recruiterRoutes = require("./routes/recruiterFeebackRoutes");
const parentsRoutes = require("./routes/parentsFeedbackRoutes");
const courseExitSurvey = require("./routes/courseExitSurveyRoutes");
const employerFeedback = require("./routes/employerFeedbackRoutes");
const alumniFeedback = require("./routes/alumniFeedbackRoutes");
const graduateExitSurvey = require("./routes/graduateExitSurveyRoutes");

const connectDB = require("./db/db");

connectDB();

app.use(express.json());
app.use(bodyParser.json());

app.use("/recruiterFeedback", recruiterRoutes);
app.use("/parentsFeedback", parentsRoutes);
app.use("/courseExitSurvey", courseExitSurvey);
app.use("/employerFeedback", employerFeedback);
app.use("/alumniFeedback", alumniFeedback);
app.use("/graduateExitSurvey", graduateExitSurvey);

app.post('/courseExitSurvey/uploadData', upload.single('csvFile'), (req, res) => {
    uploadDataCourseExitSurvey();
    res.json({
      msg: 'File successfully inserted!',
      file: req.file,
    });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server started and listening on port: ${PORT}`);
});
