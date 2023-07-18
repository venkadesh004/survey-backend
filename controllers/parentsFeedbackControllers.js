const ParentsFeedback = require('../models/parentsFeedback');

const getFeedback = (req, res) => {
    ParentsFeedback.find({}).then((data) => {
        res.send(data);
    });
};

const addFeedback = async (req, res) => {
    try {
        const data = req.body;

        await ParentsFeedback.insertMany(data).then(result => {
            res.sendStatus(201).json(result);
        }).catch(err => {
            console.log(err);
            res.sendStatus(500).json({ err: "Internal server error!" });
        });
    } catch (err) {
        console.log(err);
    }
};

const deleteFeedback = async (req, res) => {
    try {
        const data = req.body;

        console.log(data);
        await ParentsFeedback.deleteOne(data).then(result => {
            ParentsFeedback.find({}).then(data => {
                res.send(data);
            });
        }).catch(err => {
            console.log(err);
            res.sendStatus(500).json({ err: "Internal server Error!" });
        });
    } catch (err) {
        console.log(err);
    }
}

const updateFeedback = async (req, res) => {
    try {
        const data = req.body;

        await ParentsFeedback.updateOne(data).then(result => {
            ParentsFeedback.find({}).then(data => {
                res.send(data);
            });
        }).catch(err => {
            console.log(err);
            res.sendStatus(500).json({ err: "Internal server Error!" });
        });
    } catch (err) {
        console.log(err);
    }
}

module.exports.getFeedback = getFeedback;
module.exports.addFeedback = addFeedback;
module.exports.deleteFeedback = deleteFeedback;
module.exports.updateFeedback = updateFeedback;