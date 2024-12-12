const newrelic = require('newrelic');

// 4. Log the memory use
module.exports = () => {
    setInterval(() => {
        const memoryUsage = process.memoryUsage();
    
        newrelic.recordCustomEvent('MemoryUsage', {
            heapUsed: parseFloat((memoryUsage.heapUsed / 1024 / 1024).toFixed(2)),
            rss: parseFloat((memoryUsage.rss / 1024 / 1024).toFixed(2)),
            external: parseFloat((memoryUsage.external / 1024 / 1024).toFixed(2)),
        }).log('Memory usage metrics sent to New Relic');
    }, 60000);
} 


