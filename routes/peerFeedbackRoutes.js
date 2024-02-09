const express = require('express');
const Router = express.Router();

const {addFeedback, getFeedback, updateFeedback, deleteFeedback} = require('../controllers/peerFeedbackControllers');

Router.route('/getPeerFeedback').get(getFeedback);
Router.route('/addPeerFeedback').post(addFeedback);
Router.route('/updatePeerFeedback').put(updateFeedback);
Router.route('/deletePeerFeedback').delete(deleteFeedback);

module.exports = Router;