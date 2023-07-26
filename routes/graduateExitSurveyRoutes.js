const express = require('express');
const Router = express.Router();

const {addFeedback, getFeedback, deleteFeedback, updateFeedback} = require('../controllers/graduateExitSurveyControllers');

Router.route('/getGraduateExitSurvey').get(getFeedback);
Router.route('/addGraduateExitSurvey').post(addFeedback);
Router.route('/deleteGraduateExitSurvey').delete(deleteFeedback);
Router.route('/updateGraduateExitSurvey').put(updateFeedback);

module.exports = Router;