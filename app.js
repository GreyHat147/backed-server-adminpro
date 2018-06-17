const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const appRoutes = require('./routes/app');
const userRoutes = require('./routes/usuario');

mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res) => {
    if (err) throw err;
    console.log("Database Running");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', appRoutes);
app.use('/usuario', userRoutes);

app.listen(8080, () => {
    console.log("Server running");
});