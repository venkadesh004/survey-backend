const express = require('express');
const Router = express.Router();

const {addFeedback, getFeedback, deleteFeedback, updateFeedback} = require('../controllers/alumniFeedbackControllers');

Router.route('/getAlumniFeedback').get(getFeedback);
Router.route('/addAlumniFeedback').post(addFeedback);
Router.route('/deleteAlumniFeedback').delete(deleteFeedback);
Router.route('/updateAlumniFeedback').put(updateFeedback);

module.exports = Router;