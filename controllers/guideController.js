const mongoose = require('mongoose');
const Guide = require('../models/guideModel');

exports.getAllGuides = async(req, res) => {
    try {
        const guides = await Guide.find();

        res.status(200).json({
            status: 'success',
            results_qnt: guides.length,
            guides
        })
    } catch(err) {
        console.log(err);
        res.status(400).json({
            status: 'failure',
            err
        })
    }
}

exports.createGuide = async(req, res) => {
    try {
        const guide = await Guide.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                guide
            }
        })
    } catch(err) {
        console.log(err);
        res.status(400).json({
            status: 'failure',
            err
        })
    }
}

exports.getGuideById = async(req, res) => {
    try {
        const id = req.params.id
        
        const guide = await Guide.findById(id);

        res.status(200).json({
            status: 'success',
            guide
        })
    } catch(err) {
        console.log(err);
        res.status(400).json({
            status: 'failure',
            err
        })
    }
}

exports.updateGuide = async(req, res) => {
    try {
        const id = req.params.id;

        const updatedGuide = await Guide.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(201).json({
            status: 'success',
            updatedGuide
        })

    } catch(err) {
        console.log(err);
        res.status(400).json({
            status: 'failure',
            err
        })
    }
}

exports.deleteGuide = async(req, res) => {
    console.log('req received');
    try {
        const id = req.params.id;
        console.log('Deleting guide with id:', id);

        await Guide.findByIdAndDelete(id);

        res.status(204).json({
            status: 'success',
            data: null
        })
    } catch(err) {
        console.log(err);
        res.status(400).json({
            status: 'failure',
            err
        })
    }
}

exports.getAllGuidesByTechnology = async(req, res, next) => {
    try {
        const { technology } = req.params;

        const technologies = await Guide.find({ technology });
        res.status(200).json({
            status: 'success',
            qnt_of_entries: technologies.length,
            data: technologies
        })
    } catch(err) {
        console.log(err);
        res.status(400).json({
            status: 'failure',
            err
        })
    }
}