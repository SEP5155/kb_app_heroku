const { PerformanceObserver } = require('perf_hooks');
const newrelic = require('newrelic');

// 3. Setup GC
module.exports = () => {
    const obs = new PerformanceObserver((items) => {
        items.getEntries().forEach((entry) => {
            console.log(`Garbage Collection: Kind=${entry.kind}, Duration=${entry.duration.toFixed(2)}ms`);
            newrelic.recordCustomEvent('GarbageCollection', {
                kind: entry.kind,
                duration: entry.duration.toFixed(2), // ms
            });
        });
    });
    obs.observe({ entryTypes: ['gc'] });

    console.log('GC Logger initialized');
};