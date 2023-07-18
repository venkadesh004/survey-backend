const express = require('express');
const Router = express.Router();

const {addFeedback, getFeedback, updateFeedback, deleteFeedback} = require('../controllers/courseExitSurveyControllers');

Router.route('/getCourseExitSurvey').get(getFeedback);
Router.route('/addCourseExitSurvey').post(addFeedback);
Router.route('/updateCourseExitSurvey').put(updateFeedback);
Router.route('/deleteCourseExitSurvey').delete(deleteFeedback);

module.exports = Router;