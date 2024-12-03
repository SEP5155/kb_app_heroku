exports.memoryHog = (req, res) => {
    const size = 5000000; // Размер массива (50 миллионов элементов)
    const largeArray = new Array(size);

    // Заполняем массив большим количеством данных
    for (let i = 0; i < size; i++) {
        largeArray[i] = `Element ${i}`;
    }

    // Логируем использование памяти
    const memoryUsage = process.memoryUsage();
    console.log('Memory usage:', {
        heapUsed: memoryUsage.heapUsed / 1024 / 1024, // MB
        rss: memoryUsage.rss / 1024 / 1024, // MB
    });

    // Отправляем ответ
    res.status(200).json({
        message: 'Memory hog route executed',
        memoryUsed: `${memoryUsage.heapUsed / 1024 / 1024} MB`,
    });
};