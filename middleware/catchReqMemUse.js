const newrelic = require('newrelic');
const http = require('http');
const express = require('express');
const MEMORY_THRESHOLD = 0.7; // 70% использования памяти

// 2. Логирование памяти с маршрутом при превышении порога
// Middleware для логирования памяти
module.exports = (req, res, next) => {
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
};