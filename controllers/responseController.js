const mongoose = require('mongoose');
const Response = require('../models/responsesModel');

exports.createResponse = async(req, res, next) => {
    
    try {
        const newResponse = await Response.create(req.body);

        res.status(201).json({
            status: 'success',
            data: newResponse
        })
    } catch(err) {
        res.status(400).json({
            status: 'failed',
            err
        })
    }
}

exports.getAllResponses = async(req, res, next) => {
    try {
        const responses = await Response.find();

        res.status(200).json({
            status: 'success',
            amount_of_entries: responses.length,
            data: responses
        })
    } catch(err) {
        res.status(400).json({
            status: 'failed',
            err
        })
    }
}

exports.getOneResponse = async(req, res, next) => {
    try {
        const id = req.params.id;

        const response = await Response.findById(id);

        res.status(200).json({
            status: 'success',
            data: response
        })
    } catch(err) {
        res.status(400).json({
            status: 'failed',
            err
        })
    }
}

exports.deleteResponse = async(req, res, next) => {
    try {
        const id = req.params.id;
        await Response.findByIdAndDelete(id);
        res.status(204).json({
            status: 'success',
            data: null
        })
    } catch(err) {
        res.status(400).json({
            status: 'failed',
            err
        })
    }
}

exports.updateResponse = async(req, res, next) => {
    try {
        const id = req.params.id;

        const updatedResponse = await Response.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(201).json({
            status: 'success',
            data: updatedResponse
        })
    } catch(err) {
        res.status(400).json({
            status: 'failed',
            err
        })
    }
}

exports.getAllEntriesBySubcatigorie = async(req, res, next) => {
    try {
        const { subCategory } = req.params;
        const responses = await Response.find({ subCategory });

        res.status(201).json({
            status: 'success',
            qnt_of_entries: responses.length,
            data: responses
        })
    } catch(err) {
        res.status(400).json({
            status: 'failed',
            err
        })
    }
}