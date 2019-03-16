var express     = require('express'),
    articles    = require('./src/api/v1/usersactivity/useractivity.js');
var bodyParser  = require('body-parser');
var cors        = require('cors');
var util        = require('util');
var path        = require('path');

var dbHelper    = require('./src/helper/db-helper.js');

// Initialize express
var app = express();

// Initialize express middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ exended: false }));

// Route to useractivity API
app.use('/api/v1/useractivity', articles);

// Initialize database
dbHelper.initDb();

// Launch server
var server = app.listen(4000, () => {
    util.log(`Listening on port : ${server.address().port}`)
});