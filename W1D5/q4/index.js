const express = require('express');
require('dotenv').config();
require('./api/data/db');

const app = express();
app.use(express.json());

const router = require('./api/router');

app.use((req, res, next) => {
    console.log(req.method, req.url, req.body);
    next();
});

app.use('/api', router);


const server = app.listen(process.env.PORT, function() {
    console.info(`listening the ${server.address().port}`)
})