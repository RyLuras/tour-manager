const express = require('express');
const app = express();
const morgan = require('morgan');
const { handler, HttpError } = require('./util/errors');

app.use(morgan('dev', {
    skip() {
        return process.env.NODE_ENV === 'test';
    }
}));
app.use(express.static('public'));
app.use(express.json());

app.use('/api/tours', require('./routes/tours'));

app.get('/error', (req, res) => {
    throw new HttpError({ code: 505, message: 'my HttpError' });
});

app.use((req, res) => {
    res.status(404);
    res.end('404 Not Found');
});

app.use(handler);


module.exports = app;
