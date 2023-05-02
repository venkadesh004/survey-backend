const express = require('express');
const Router = express.Router();

const {addFeedback, getFeedback} = require('../controllers/parentsFeedbackControllers');

Router.route('/getParentsFeedback').get(getFeedback);
Router.route('/addParentsFeedback').post(addFeedback);

module.exports = Router;