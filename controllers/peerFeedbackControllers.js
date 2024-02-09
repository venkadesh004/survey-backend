const PeerFeedback = require('../models/peerFeedback');

const getFeedback = (req, res) => {
    PeerFeedback.find({}).then((data) => {
        return res.send(data);
    });
};

const addFeedback = async (req, res) => {
    try {
        const data = req.body;

        await PeerFeedback.insertMany(data).then(result => {
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
        await PeerFeedback.deleteOne(data).then(result => {
            PeerFeedback.find({}).then(data => {
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

        await PeerFeedback.updateOne({"_id": data["_id"]}, data).then(result => {
            PeerFeedback.find({}).then(data => {
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