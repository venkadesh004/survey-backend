const express = require('express');
const Router = express.Router();

const {addFeedback, getFeedback} = require('../controllers/courseExitSurveyControllers');

Router.route('/getCourseExitSurvey').get(getFeedback);
Router.route('/addCourseExitSurvey').post(addFeedback);

module.exports = Router;