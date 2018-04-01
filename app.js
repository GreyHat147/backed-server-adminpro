let express = require('express');
let mongoose = require('mongoose');
let app = express();
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res) => {
    if (err) throw err;
    console.log("Database Running");
});

app.listen(8080, () => {
    console.log("Server running");
});