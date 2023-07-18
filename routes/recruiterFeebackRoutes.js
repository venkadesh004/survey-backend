const express = require('express');
const Router = express.Router();

const {addFeedback, getFeedback, deleteFeedback, updateFeedback} = require('../controllers/recruiterFeedbackControllers');

Router.route('/getRecruiterFeedback').get(getFeedback);
Router.route('/addRecruiterFeedback').post(addFeedback);
Router.route('/deleteRecruiterFeedback').delete(deleteFeedback);
Router.route('/updateRecruiterFeedback').put(updateFeedback);

module.exports = Router;