const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const util = require('util');
const path = require('path');
const swaggerJSDoc = require('swagger-jsdoc');
const dbHelper = require('./src/v1/helper')
const routes = require('./src/v1/routes');

// Initialize express
var app = express();

// Swagger definition
var swaggerDefinition = {
    info: {
        title: 'Pikachu API',
        version: '1.0.0',
        description: 'Smart building management using Estimote sensors boilerplate'
    },
    host: 'localhost:4000',
    basePath: '/'
}

// Swagger options
var swaggerOptions = {
    swaggerDefinition: swaggerDefinition,
    apis: ['./**/routes/*.js', 'routes.js'],
}

var swaggerSpec = swaggerJSDoc(swaggerOptions);

// Initialize express middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ exended: false }));

app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
})
app.get('/', (req, res) => { res.send('Application online') })

// Route to useractivity API
app.use('/api/v1', routes);

// Initialize database
dbHelper.DbHelper.dbConnection();

// Launch server
var server = app.listen(4000, () => {
    util.log(`Listening on port : ${server.address().port}`)
});