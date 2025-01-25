const express = require('express');

exports.getDataByQuery = (req, res) => {
    try {
        const { id, type } = req.query;

        if (!id || !type ) {
            res.status(400).json({
                status: 'fail',
                data: {
                    message: 'No parameters are set'
                }
            })
        }

        res.status(200).json({
            status: 'success',
            data: {
                id,
                type,
                message: `Processed req for id: ${id} and type: ${type}`
            }
        })
    } catch (err) {
        console.warn(err);
    }
}