require('newrelic');
const http = require('http');
const express = require('express');
const basicRouter = require('./routes/basicRoute');
const guideRouter = require('./routes/guideRoute');
const responseRouter = require('./routes/responseRoute');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();

dotenv.config({ path: './config.env'});

const DB = process.env.DATABASE;
// const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DB_PASSWORD);
console.log(DB);

mongoose.connect(DB).then( () => console.log('DB connected!')).catch(err => console.error('Connection error:', err));;

const server = http.createServer();
app.use(express.json());

// app.use('api/v1/home', basicRouter);
app.use('/', basicRouter);
app.use('/api/v1/guide/', guideRouter);
app.use('/api/v1/responses/', responseRouter);

app.all('*', (req, res, next) => {
    res.status(404).json({
        status: 'failed',
        message: 'Route is not defined'
    })
    next();
})

const PORT = process.env.PORT || 3009;

app.listen(PORT, '127.0.0.1', () => {
    console.log('server is listening now')
})