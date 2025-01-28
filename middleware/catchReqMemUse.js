const newrelic = require('newrelic');
const { URL } = require('url');

const MEMORY_THRESHOLD = 0.5; // 50% of memory use

// 2. Memory logging with route when threshold is exceeded

// Middleware for memory logging per request
module.exports = (req, res, next) => {
    try {
        
        const currentRssUsage = process.memoryUsage().rss / (1024 * 1024); // MB
        const maxAllowedMemory = process.env.WEB_MEMORY || 512; // Heroku Memory Limit
        const memoryUsagePercentage = currentRssUsage / maxAllowedMemory;

        // cutting the route
        const protocol = req.protocol;
        const parcedUrl = new URL(req.original, `${protocol}://${req.headers.host}`)
        const routePath = parcedUrl.pathname;
        const queryParams = parcedUrl.searchParams.toString() || "";
        console.log('prorocol' + req.protocol + 'parcedUrl: ' + `${parcedUrl}`);

        if (memoryUsagePercentage > MEMORY_THRESHOLD && process.env.USE_MEMORY_LIMIT === "true") {
            // If memory usage is above 50%, don't run middleware
            console.warn(`Memory usage is too high (${(memoryUsagePercentage * 100).toFixed(2)}%). Skipping logging.`);
            return next();
        }
        
        const startMemoryUsage = process.memoryUsage(); // We save the initial state of memory

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
                    route: routePath,
                    query: queryParams,
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