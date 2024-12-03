const express = require('express');

exports.getHomePage = (req, res) => {
    res.send('Home page reached');
}