const mongoose = require('mongoose');

exports.getTopics = async (req, res) => {
    const topics = await mongoose.connection.db.listCollections().toArray();
    const topicNames = topics.map((col) => col.name)

    res.status(200).json({
        status: 'success',
        data: topicNames
    })
}