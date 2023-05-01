const RecruiterFeedback = require('../models/recruiterFeedback');

const getFeedback = (req, res) => {
    RecruiterFeedback.findOne({}).then((data) => {
        res.send(data);
    });
};

const addFeedback = async (req, res) => {
    try {
        const data = req.body;

        await RecruiterFeedback.insertMany(data).then(result => {
            res.sendStatus(201).json(result);
        }).catch(err => {
            res.send(500).json({err: "Internal server error!"});
        });
    } catch (err) {
        console.log(err);
    }
};

module.exports.getFeedback = getFeedback;
module.exports.addFeedback = addFeedback;