const express = require('express');
const mongoose = require('mongoose');
const Guide = require('../models/guideModel');
const Response = require('../models/responsesModel');

exports.getHomePage = async (req, res) => {
    const topics = await mongoose.connection.db.listCollections().toArray();
    const topicNames = topics.map((col) => col.name)

    const guides = await Guide.find();

    const responses = await Response.find();

    console.log(guides, responses);

    
    res.render('layout', { topicNames, guides, responses });
}