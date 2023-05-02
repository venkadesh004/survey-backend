const express = require('express');
const Router = express.Router();

const {addFeedback, getFeedback} = require('../controllers/employerFeedbackControllers');

Router.route('/getEmployerFeedback').get(getFeedback);
Router.route('/addEmployerFeedback').post(addFeedback);

module.exports = Router;