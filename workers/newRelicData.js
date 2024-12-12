const newrelic = require('newrelic');

// 4. Настраиваем логирование памяти
module.exports = () => {
    setInterval(() => {
        const memoryUsage = process.memoryUsage();
    
        newrelic.recordCustomEvent('MemoryUsage', {
            heapUsed: (memoryUsage.heapUsed / 1024 / 1024).toFixed(2), // MB
            rss: (memoryUsage.rss / 1024 / 1024).toFixed(2), // MB
            external: (memoryUsage.external / 1024 / 1024).toFixed(2), // MB
        });
    
        console.log('Memory usage metrics sent to New Relic');
    }, 60000);
} 