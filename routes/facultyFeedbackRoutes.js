const express = require('express');
const Router = express.Router();

const {addFeedback, getFeedback, updateFeedback, deleteFeedback} = require('../controllers/facultyFeedbackControllers');

Router.route('/getFacultyFeedback').get(getFeedback);
Router.route('/addFacultyFeedback').post(addFeedback);
Router.route('/updateFacultyFeedback').put(updateFeedback);
Router.route('/deleteFacultyFeedback').delete(deleteFeedback);

module.exports = Router;