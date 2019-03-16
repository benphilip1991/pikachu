const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const util = require('util');
const path = require('path');

const routes = require('./src/v1/routes');

// Initialize express
var app = express();

// Initialize express middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ exended: false }));

app.get('/', (req, res) => { res.send('Application online')})

// Route to useractivity API
app.use('/api/v1', routes);

// Initialize database
//dbHelper.initDb();

// Launch server
var server = app.listen(4000, () => {
    util.log(`Listening on port : ${server.address().port}`)
});