require('newrelic');
const http = require('http');
const express = require('express');
const basicRouter = require('./routes/basicRoute');
const guideRouter = require('./routes/guideRoute');
const responseRouter = require('./routes/responseRoute');
const loadTestRouter = require('./routes/loadTestRoute');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const path = require('path');

const { PerformanceObserver } = require('perf_hooks');
const newrelic = require('newrelic');

const MEMORY_THRESHOLD = 0.7; // 70% использования памяти

// 3. Настраиваем логирование GC
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



// 4. Настраиваем логирование памяти
setInterval(() => {
    const memoryUsage = process.memoryUsage();

    newrelic.recordCustomEvent('MemoryUsage', {
        heapUsed: (memoryUsage.heapUsed / 1024 / 1024).toFixed(2), // MB
        rss: (memoryUsage.rss / 1024 / 1024).toFixed(2), // MB
        external: (memoryUsage.external / 1024 / 1024).toFixed(2), // MB
    });

    console.log('Memory usage metrics sent to New Relic');
}, 60000);

dotenv.config({ path: './config.env'});

const DB = process.env.DATABASE;
// const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DB_PASSWORD);
console.log(DB);

mongoose.connect(DB).then( () => console.log('DB connected!')).catch(err => console.error('Connection error:', err));;

const server = http.createServer();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'static')));
// 2. Логирование памяти с маршрутом при превышении порога
// Middleware для логирования памяти
app.use((req, res, next) => {
    const startMemoryUsage = process.memoryUsage(); // Сохраняем начальное состояние памяти

    res.on('finish', () => {
        // Сохраняем состояние памяти после обработки запроса
        const endMemoryUsage = process.memoryUsage();

        // Рассчитываем разницу в памяти
        const heapUsedChange = ((endMemoryUsage.heapUsed - startMemoryUsage.heapUsed) / 1024 / 1024).toFixed(2); // MB
        const rssChange = ((endMemoryUsage.rss - startMemoryUsage.rss) / 1024 / 1024).toFixed(2); // MB

        const heapUsedInMB = (endMemoryUsage.heapUsed / 1024 / 1024).toFixed(2); // MB
        const rssInMB = (endMemoryUsage.rss / 1024 / 1024).toFixed(2); // MB

        console.log(`Memory usage for route: ${req.originalUrl}`);
        console.log(`Heap Used: ${heapUsedInMB} MB (Change: ${heapUsedChange} MB)`);
        console.log(`RSS: ${rssInMB} MB (Change: ${rssChange} MB)`);

        // Отправка данных в New Relic
        newrelic.recordCustomEvent('HighMemoryUsage', {
            route: req.originalUrl,
            heapUsed: heapUsedInMB,
            rss: rssInMB,
            heapUsedChange, // Разница в heap
            rssChange, // Разница в RSS
        });
    });

    next();
});
// app.use('api/v1/home', basicRouter);
// app.use('/', basicRouter);
app.use('/api/v1/guide/', guideRouter);
app.use('/api/v1/responses/', responseRouter);
app.use('/memory-hog/', loadTestRouter);

app.all('*', (req, res, next) => {
    res.status(404).json({
        status: 'failed',
        message: 'Route is not defined'
    })
    next();
})

const PORT = process.env.PORT || 3000;

if (process.env.ENVIRONMENT === 'production') {
    app.listen(PORT, '0.0.0.0', () => {
        console.log('server is listening now')
    })
} else if (process.env.ENVIRONMENT === 'development') {
    app.listen(9999, '127.0.0.1', () => {
        console.log('server is listening now')
    })
}
