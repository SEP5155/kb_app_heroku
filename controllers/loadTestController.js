
exports.memoryHogHard = (req, res) => {
    const size = 1500000; // Array size (50 million elements)
    const largeArray = new Array(size);

    // Filling the array with a large amount of data
    for (let i = 0; i < size; i++) {
        largeArray[i] = `Element ${i}`;
    }

    // const memoryUsage = process.memoryUsage();
    const memoryUsage = process.memoryUsage();
    console.log('Memory usage:', {
        heapUsed: memoryUsage.heapUsed / 1024 / 1024, // MB
        rss: memoryUsage.rss / 1024 / 1024, // MB
    });

    res.status(200).json({
        message: 'Memory hog route executed',
        memoryUsed: `${memoryUsage.heapUsed / 1024 / 1024} MB`,
    });
};

exports.memoryHogLight = async (req, res) => {
    const size = 50000;
    const lightArray = new Array(size);

    for (i = 0; i < size; i++) {
        lightArray[i] = `Element${i}`
    }

    const memoryUsage = process.memoryUsage();
    console.log('Memory usage:', {
        heapUsed: memoryUsage.heapUsed / 1024 / 1024, // MB
        rss: memoryUsage.rss / 1024 / 1024, // MB
    });

    res.status(200).json({
        message: 'Memory hog route executed',
        memoryUsed: `${memoryUsage.heapUsed / 1024 / 1024} MB`,
    });
}
exports.memoryHogModerate = async (req, res) => {
    const size = 500000;
    const lightArray = new Array(size);

    for (i = 0; i < size; i++) {
        lightArray[i] = `Element${i}`
    }

    const memoryUsage = process.memoryUsage();
    console.log('Memory usage:', {
        heapUsed: memoryUsage.heapUsed / 1024 / 1024, // MB
        rss: memoryUsage.rss / 1024 / 1024, // MB
    });

    res.status(200).json({
        message: 'Memory hog route executed',
        memoryUsed: `${memoryUsage.heapUsed / 1024 / 1024} MB`,
    });
}