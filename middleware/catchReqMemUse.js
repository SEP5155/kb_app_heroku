const newrelic = require('newrelic');
const MEMORY_THRESHOLD = 0.5; // 50% of memory use

// 2. Memory logging with route when threshold is exceeded

// Middleware for memory logging per request
module.exports = (req, res, next) => {
    try {
        const startMemoryUsage = process.memoryUsage(); // We save the initial state of memory

        const currentHeapUsage = startMemoryUsage.heapUsed / startMemoryUsage.heapTotal;

        if (currentHeapUsage > MEMORY_THRESHOLD) {
                console.log(parseFloat(((currentHeapUsage) / 1024 / 1024).toFixed(2)) + 'Do not proceed with mmory usgae loging since threshold exeeded');
                return next();
        }

        res.on('finish', () => {    
            try {
                 // Saving the memory state after processing a request
                const endMemoryUsage = process.memoryUsage();

                // Calculating the difference in memory
                const heapUsedChange = parseFloat(((endMemoryUsage.heapUsed - startMemoryUsage.heapUsed) / 1024 / 1024).toFixed(2)); // MB
                const rssChange = parseFloat(((endMemoryUsage.rss - startMemoryUsage.rss) / 1024 / 1024).toFixed(2)); // MB

                const heapUsedInMB = parseFloat((endMemoryUsage.heapUsed / 1024 / 1024).toFixed(2)); // MB
                const rssInMB = parseFloat((endMemoryUsage.rss / 1024 / 1024).toFixed(2)); // MB

                // Sending data to New Relic
                newrelic.recordCustomEvent('HighMemoryUsage', {
                    route: req.originalUrl,
                    method: req.method,
                    statusCode: res.statusCode,
                    heapUsed: heapUsedInMB,
                    rss: rssInMB,
                    heapUsedChange, // Difference in heap
                    rssChange, // Difference in RSS
                });
            } catch (err) {
                console.error('Error while processing memory usage:', err);
            }
        });

        next();
    } catch (err) {
        console.error('Error in memory logging middleware:', err);
        next(err);
    }
    
};