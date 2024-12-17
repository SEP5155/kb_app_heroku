const newrelic = require('newrelic');
const http = require('http');
const express = require('express');
const gcObserver = require('./workers/performanceObserver');
const pushMemUseLogs = require('./workers/newRelicData');
const catchReqMemUse = require('./middleware/catchReqMemUse');
const basicRouter = require('./routes/basicRoute');
const guideRouter = require('./routes/guideRoute');
const topicRouter = require('./routes/topicRoute');
const responseRouter = require('./routes/responseRoute');
const loadTestRouter = require('./routes/loadTestRoute');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const path = require('path');


// if (process.env.ENVIRONMENT === "production") {
//     // gcObserver();
//     pushMemUseLogs();
// }


dotenv.config({ path: './config.env'});

const DB = process.env.DATABASE;
// const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DB_PASSWORD);
console.log(DB);

mongoose.connect(DB).then( () => console.log('DB connected!')).catch(err => console.error('Connection error:', err));;

const server = http.createServer();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'static')));

// app.use('api/v1/home', basicRouter);
// app.use('/', basicRouter);
if (process.env.ENVIRONMENT === 'production') {
    app.use(catchReqMemUse);
}
app.use('/api/v1/topics/', topicRouter);
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
