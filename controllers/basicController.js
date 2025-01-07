const express = require('express');
const mongoose = require('mongoose');
const Guide = require('../models/guideModel');
const Response = require('../models/responsesModel');

exports.getHomePage = async (req, res) => {
    const topics = await mongoose.connection.db.listCollections().toArray();
    const topicNames = topics.map((col) => col.name)

    const guides = await Guide.find();

    const responses = await Response.find();

    const filteredGuides = Array.from(new Map(guides.map(item => [item.technology, item])).values());
    const filteredResponses = Array.from(new Map(responses.map(item => [item.subCategory, item])).values());

    res.render('layout', { topicNames, guides, responses, filteredGuides, filteredResponses });
}
exports.getAdminPanel = (req, res) => {
    res.render('admin_panel');
}