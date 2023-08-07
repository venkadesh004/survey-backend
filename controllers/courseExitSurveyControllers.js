const CourseExitSurvey = require('../models/courseExitSurvey');
const createCSVWriter = require('csv-writer').createObjectCsvWriter;

const courseExitSurveyHeader = [
    {id: "courseCode", title: "Course Code"},
    {id: "courseName", title: "Course Name"},
    {id: "year", title: "Year"},
    {id: "CO1", title: "CO1"},
    {id: "CO2", title: "CO2"},
    {id: "CO3", title: "CO3"},
    {id: "CO4", title: "CO4"},
    {id: "CO5", title: "CO5"},
    {id: "CO6", title: "CO6"},
    {id: "CO7", title: "CO7"},
    {id: "CO8", title: "CO8"},
    {id: "appropriatenessOfAssessmentToolsUsed", title: "Appropriateness Of Assessment Tools"},
    {id: "courseSuggestions", title: "Course Suggestions"},
    {id: "like", title: "Like"},
    {id: "dislike", title: "Dislike"},
    {id: "hostingTools", title: "Hosting Tools"},
    {id: "lectureRating", title: "Lecture Rating"},
    {id: "textBookAvailability", title: "Text Book Availability"}
];

const fileURL = './download/courseExitSurvey.csv';

const csvWriter = createCSVWriter({
    path: fileURL,
    header: courseExitSurveyHeader
});

const getFeedback = (req, res) => {
    CourseExitSurvey.find({}).then((data) => {
        return res.send(data);
    });
};

const addFeedback = async (req, res) => {
    try {
        const data = req.body;

        await CourseExitSurvey.insertMany(data).then(result => {
            return res.sendStatus(201).json(result);
        }).catch(err => {
            console.log(err);
            return res.sendStatus(500).json({ err: "Internal server error!" });
        });
    } catch (err) {
        console.log(err);
    }
};

const deleteFeedback = async (req, res) => {
    try {
        const data = req.body;

        console.log(data);
        await CourseExitSurvey.deleteOne(data).then(result => {
            CourseExitSurvey.find({}).then(data => {
                return res.send(data);
            });
        }).catch(err => {
            console.log(err);
            return res.sendStatus(500).json({ err: "Internal server Error!" });
        });
    } catch (err) {
        console.log(err);
    }
}

const updateFeedback = async (req, res) => {
    try {
        const data = req.body;

        await CourseExitSurvey.updateOne({"_id": data["_id"]}, data).then(result => {
            CourseExitSurvey.find({}).then(data => {
                return res.send(data);
            });
        }).catch(err => {
            console.log(err);
            return res.sendStatus(500).json({ err: "Internal server Error!" });
        });
    } catch (err) {
        console.log(err);
    }
}

const downloadData = async (req, res) => {
    CourseExitSurvey.find({}).then((data) => {
        var csvData = [];

        data.forEach(element => {
            csvData.push(element);
        });

        csvWriter.writeRecords(data).then(() => {
            return res.download(fileURL);
        }).catch(err => {
            console.log(err);
            return res.sendStatus(500).json({err: "Internal server Error!"});
        });
    }).catch(err => {
        console.log(err);
        return res.sendStatus(500).json({err: "Internal server Error!"});
    });
} 

module.exports.getFeedback = getFeedback;
module.exports.addFeedback = addFeedback;
module.exports.deleteFeedback = deleteFeedback;
module.exports.updateFeedback = updateFeedback;
module.exports.downloadData = downloadData;