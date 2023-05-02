const ParentsFeedback = require('../models/parentsFeedback');

const getFeedback = (req, res) => {
    ParentsFeedback.findOne({}).then((data) => {
        res.send(data);
    });
};

const addFeedback = async (req, res) => {
    try {
        const data = req.body;

        await ParentsFeedback.insertMany(data).then(result => {
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