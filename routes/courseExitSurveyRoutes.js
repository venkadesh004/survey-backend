const express = require('express');
const Router = express.Router();

const {addFeedback, getFeedback, updateFeedback, deleteFeedback, downloadData, getCourseReport, getCourses, getCourseFeedback} = require('../controllers/courseExitSurveyControllers');

Router.route('/getCourseExitSurvey').get(getFeedback);
Router.route('/addCourseExitSurvey').post(addFeedback);
Router.route('/updateCourseExitSurvey').put(updateFeedback);
Router.route('/deleteCourseExitSurvey').delete(deleteFeedback);
Router.route('/downloadCourseExitSurvey').get(downloadData);
Router.route('/getCourseReport/:courseCode').get(getCourseReport);
Router.route('/getCourses').get(getCourses);
Router.route('/getCourseFeedback/:courseCode').get(getCourseFeedback);

module.exports = Router;