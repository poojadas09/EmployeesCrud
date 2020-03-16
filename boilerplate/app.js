'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const employeeRoutes = require('./routes/employee');
const app = express();
const port = parseInt(process.env.PORT || '3000');

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


app.use('/api/employees', employeeRoutes);

// Fail over route
app.use(function (req, res) {
    res.status(404).send('Not found ....');
});

// listen for requests
app.listen(port, function () {
    console.log(`Server is listening on port ${port}`);
});

module.exports = app;
