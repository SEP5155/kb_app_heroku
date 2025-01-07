const mongoose = require('mongoose');
const fs = require('fs');
const Response = require('./models/responsesModel');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env'});

const importData = async () => {
    try {
        const DB = process.env.DATABASE;
        mongoose.connect(DB).then( () => console.log('DB connected!')).catch(err => console.error('Connection error:', err));;
        const responseData = JSON.parse(fs.readFileSync('responses_data.json', 'utf-8'));

        await Response.insertMany(responseData);
        console.log('Data successfully imported!');

        process.exit(); 
    } catch(err) {
        console.error('Error while importing data:', err);
        process.exit(1);
    }
}
importData();