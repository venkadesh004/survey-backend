const RecruiterFeedback = require('../models/recruiterFeedback');

const getFeedback = (req, res) => {
    RecruiterFeedback.find({}).then((data) => {
        return res.send(data);
    });
};

const addFeedback = async (req, res) => {
    try {
        const data = req.body;

        await RecruiterFeedback.insertMany(data).then(result => {
            return res.sendStatus(201).json(result);
        }).catch(err => {
            console.log(err);
            return res.sendStatus(500).json({ err: "Internal server error!" });
        });
    } catch (err) {
        console.log(err);
    }
};

const deleteFeedback = async (req, res) => {
    try {
        const data = req.body;

        console.log(data);
        await RecruiterFeedback.deleteOne(data).then(result => {
            RecruiterFeedback.find({}).then(data => {
                return res.send(data);
            });
        }).catch(err => {
            console.log(err);
            return res.sendStatus(500).json({ err: "Internal server Error!" });
        });
    } catch (err) {
        console.log(err);
    }
}

const updateFeedback = async (req, res) => {
    try {
        const data = req.body;
        console.log(data["_id"]);

        await RecruiterFeedback.updateOne({"_id": data["_id"]}, data).then(result => {
            RecruiterFeedback.find({}).then(data => {
                return res.send(data);
            });
        }).catch(err => {
            console.log(err);
            return res.sendStatus(500).json({ err: "Internal server Error!" });
        });
    } catch (err) {
        console.log(err);
    }
}

module.exports.getFeedback = getFeedback;
module.exports.addFeedback = addFeedback;
module.exports.deleteFeedback = deleteFeedback;
module.exports.updateFeedback = updateFeedback;