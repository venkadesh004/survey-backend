const express = require('express');
const Router = express.Router();

const {addFeedback, getFeedback} = require('../controllers/recruiterFeedbackControllers');

Router.route('/getRecruiterFeedback').get(getFeedback);
Router.route('/addRecruiterFeedback').post(addFeedback);

module.exports = Router;