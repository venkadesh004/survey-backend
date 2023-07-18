const express = require('express');
const Router = express.Router();

const {addFeedback, getFeedback, updateFeedback, deleteFeedback} = require('../controllers/parentsFeedbackControllers');

Router.route('/getParentsFeedback').get(getFeedback);
Router.route('/addParentsFeedback').post(addFeedback);
Router.route('/updateParentsFeedback').put(updateFeedback);
Router.route('/deleteParentsFeedback').delete(deleteFeedback);

module.exports = Router;