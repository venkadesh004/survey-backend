const mongoose = require("mongoose");

const employerFeedback = new mongoose.Schema({
  alumnusName: {
    type: String,
  },
  alumnusRole: {
    type: String,
  },
  digitalSignature: {
    type: String,
  },
  domainKnowledge: {
    type: String,
  },
  feedbackProvider: {
    type: String,
  },
  feedbackProviderDesignation: {
    type: String,
  },
  individualAndTeamWork: {
    type: String,
  },
  natureOfalumnusRole: {
    type: String,
  },
  organizationLocation: {
    type: String,
  },
  organizationName: {
    type: String,
  },
  overallRating: {
    type: String,
  },
  qualityOfWork: {
    type: String,
  },
  suggestions: {
    type: String,
  },
  technicalKnowledge: {
    type: String,
  },
});

const EmployerFeedback = mongoose.model("EmployerFeedback", employerFeedback);

module.exports = EmployerFeedback;
