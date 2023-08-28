const CourseExitSurvey = require("../models/courseExitSurvey");
const createCSVWriter = require("csv-writer").createObjectCsvWriter;
const fs = require("fs");
const csv = require("csv-parser");

const courseExitSurveyHeader = [
  { id: "_id", title: "Key" },
  { id: "courseCode", title: "Course Code" },
  { id: "courseName", title: "Course Name" },
  { id: "year", title: "Year" },
  { id: "CO1", title: "CO1" },
  { id: "CO2", title: "CO2" },
  { id: "CO3", title: "CO3" },
  { id: "CO4", title: "CO4" },
  { id: "CO5", title: "CO5" },
  { id: "CO6", title: "CO6" },
  { id: "CO7", title: "CO7" },
  { id: "CO8", title: "CO8" },
  {
    id: "appropriatenessOfAssessmentToolsUsed",
    title: "Appropriateness Of Assessment Tools",
  },
  { id: "courseSuggestions", title: "Course Suggestions" },
  { id: "like", title: "Like" },
  { id: "dislike", title: "Dislike" },
  { id: "hostingTools", title: "Hosting Tools" },
  { id: "lectureRating", title: "Lecture Rating" },
  { id: "textBookAvailability", title: "Text Book Availability" },
];

const fileURL = "./download/courseExitSurvey.csv";

const csvWriter = createCSVWriter({
  path: fileURL,
  header: courseExitSurveyHeader,
});

const getFeedback = (req, res) => {
  CourseExitSurvey.find({}).then((data) => {
    return res.send(data);
  });
};

const addFeedback = async (req, res) => {
  try {
    const data = req.body;

    await CourseExitSurvey.insertMany(data)
      .then((result) => {
        return res.sendStatus(201).json(result);
      })
      .catch((err) => {
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
    await CourseExitSurvey.deleteOne(data)
      .then((result) => {
        CourseExitSurvey.find({}).then((data) => {
          return res.send(data);
        });
      })
      .catch((err) => {
        console.log(err);
        return res.sendStatus(500).json({ err: "Internal server Error!" });
      });
  } catch (err) {
    console.log(err);
  }
};

const updateFeedback = async (req, res) => {
  try {
    const data = req.body;

    await CourseExitSurvey.updateOne({ _id: data["_id"] }, data)
      .then((result) => {
        CourseExitSurvey.find({}).then((data) => {
          return res.send(data);
        });
      })
      .catch((err) => {
        console.log(err);
        return res.sendStatus(500).json({ err: "Internal server Error!" });
      });
  } catch (err) {
    console.log(err);
  }
};

const downloadData = async (req, res) => {
  var dataList = [];

  try {
    fs.unlinkSync(fileURL);
  } catch (err) {
    console.log("File not found!");
  }

  await CourseExitSurvey.find({})
    .then((data) => {
      dataList.push(data);
    })
    .catch((err) => {
      console.log(err);
      return res.sendStatus(500).json({ err: "Internal server Error!" });
    });

  // console.log(dataList);
  let sortedData = () => dataList[0].sort((data1, data2) => {
    if (data1.courseCode < data2.courseCode) {
      return -1;
    } 
    if (data1.courseCode > data2.courseCode) {
      return 1;
    }
    return 0;
  });

  sortedData();

  // console.log("New data List");
  // console.log(dataList);

  dataList.forEach(data => {
    csvWriter
    .writeRecords(data)
    .then(() => {
      return res.download(fileURL);
    })
    .catch((err) => {
      console.log(err);
      return res.sendStatus(500).json({ err: "Internal server Error!" });
    });
  });
};

function jsonFormater(rowData) {
  var format = {
    _id: rowData["Key"],
    courseCode: rowData["Course Code"],
    courseName: rowData["Course Name"],
    year: rowData["Year"],
    CO1: rowData["CO1"],
    CO2: rowData["CO2"],
    CO3: rowData["CO3"],
    CO4: rowData["CO4"],
    CO5: rowData["CO5"],
    CO6: rowData["CO6"],
    CO7: rowData["CO7"],
    CO8: rowData["CO8"],
    appropriatenessOfAssessmentToolsUsed:
      rowData["Appropriateness Of Assessment Tools"],
    courseSuggestions: rowData["Course Suggestions"],
    like: rowData["Like"],
    dislike: rowData["Dislike"],
    hostingTools: rowData["Hosting Tools"],
    lectureRating: rowData["Lecture Rating"],
    textBookAvailability: rowData["Text Book Availability"],
  };

  return format;
}

const uploadData = async (req, res) => {
  try {
    fs.createReadStream("./download/courseExitSurvey.csv")
      .pipe(csv())
      .on("data", async (row) => {
        newData = jsonFormater(row);
        if (newData["_id"] === "") {
          delete newData["_id"];
          await CourseExitSurvey.insertMany(newData)
            .then((result) => {
              console.log("Inserted Data");
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          await CourseExitSurvey.updateOne({ _id: newData["_id"] }, newData).then((data) => {
            console.log("Update Successful!");
          }).catch(err => {
            console.log(err);
          });
        }
      })
      .on("end", () => {
        console.log("CSV file successfully processed");
      });
  } catch (err) {
    console.log(err);
  }
};

const getCourseReport = (req, res) => {
  try {
    const data = req.params.courseCode;

    CourseExitSurvey.find({courseCode: data}).then(result => {
      var appropriatenessOfAssessmentToolsUsed = [];
      var hostingTools = [];
      var lectureRating = [];
      var textBookAvailability = [];

      var totalRating = 0;

      result.forEach(element => {
        appropriatenessOfAssessmentToolsUsed.push(element["appropriatenessOfAssessmentToolsUsed"]);
        hostingTools.push(element["hostingTools"]);
        lectureRating.push(element["lectureRating"]);
        textBookAvailability.push(element["textBookAvailability"]);
      });
      
      return res.send([appropriatenessOfAssessmentToolsUsed, hostingTools, lectureRating, textBookAvailability]);
    });
  } catch (err) {
    return res.send("Internal server Error");
  }
}

const getCourses = (req, res) => {
  CourseExitSurvey.find({}).then(result => {
    var courses = [];

    result.forEach(element => {
      // console.log(courses);
      if (!courses.includes(element["courseCode"])) {
        courses.push(element["courseCode"]);
      }
    });

    return res.send(courses);
  }).catch(err => {
    return res.send("Internal server Error");
  });
}

const getCourseFeedback = (req, res) => {
  CourseExitSurvey.find({courseCode: req.params.courseCode}).then((data) => {
    return res.send(data);
  });
};

module.exports.getFeedback = getFeedback;
module.exports.addFeedback = addFeedback;
module.exports.deleteFeedback = deleteFeedback;
module.exports.updateFeedback = updateFeedback;
module.exports.downloadData = downloadData;
module.exports.uploadDataCourseExitSurvey = uploadData;
module.exports.getCourseReport = getCourseReport;
module.exports.getCourses = getCourses;
module.exports.getCourseFeedback = getCourseFeedback;