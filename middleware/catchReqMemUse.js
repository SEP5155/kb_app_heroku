const newrelic = require('newrelic');
const http = require('http');
const express = require('express');
const MEMORY_THRESHOLD = 0.7; // 70% of memory use

// 2. Memory logging with route when threshold is exceeded
// Middleware for memory logging
module.exports = (req, res, next) => {
    const startMemoryUsage = process.memoryUsage(); // We save the initial state of memory

    res.on('finish', () => {
        // Saving the memory state after processing a request
        const endMemoryUsage = process.memoryUsage();

        // Calculating the difference in memory
        const heapUsedChange = ((endMemoryUsage.heapUsed - startMemoryUsage.heapUsed) / 1024 / 1024).toFixed(2); // MB
        const rssChange = ((endMemoryUsage.rss - startMemoryUsage.rss) / 1024 / 1024).toFixed(2); // MB

        const heapUsedInMB = (endMemoryUsage.heapUsed / 1024 / 1024).toFixed(2); // MB
        const rssInMB = (endMemoryUsage.rss / 1024 / 1024).toFixed(2); // MB

        console.log(`Memory usage for route: ${req.originalUrl}`);
        console.log(`Heap Used: ${heapUsedInMB} MB (Change: ${heapUsedChange} MB)`);
        console.log(`RSS: ${rssInMB} MB (Change: ${rssChange} MB)`);

        // Sending data to New Relic
        newrelic.recordCustomEvent('HighMemoryUsage', {
            route: req.originalUrl,
            heapUsed: heapUsedInMB,
            rss: rssInMB,
            heapUsedChange, // Difference in heap
            rssChange, // Difference in RSS
        });
    });

    next();
};