const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('dev', {
    skip() {
        return process.env.NODE_ENV === 'test';
    }
}));

app.use(express.json());

app.use('/api/tours', require('./routes/tours'));

module.exports = app;
