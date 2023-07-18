const express = require('express');
const Router = express.Router();

const {addFeedback, getFeedback, updateFeedback, deleteFeedback} = require('../controllers/employerFeedbackControllers');

Router.route('/getEmployerFeedback').get(getFeedback);
Router.route('/addEmployerFeedback').post(addFeedback);
Router.route('/updateEmployerFeedback').put(updateFeedback);
Router.route('/deleteEmployerFeedback').delete(deleteFeedback);

module.exports = Router;