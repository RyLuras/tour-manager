/* eslint-disable no-console */
require('dotenv').config();
require('./lib/util/connect')();
const { createServer } = require('http');
const app = require('./lib/app');

const port = 3579;

const server = createServer(app);

server.listen(port, () => {
    console.log(`Listening on ${port}`);
});
