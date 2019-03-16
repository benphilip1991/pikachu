'use strict';

const UserActivityRoute = require('./userActivityRoutes');
const DevicesRoute = require('./devicesRoutes');
const UserRoute = require('./userRoutes');

var routes = [].concat(UserActivityRoute, DevicesRoute, UserRoute);

module.exports = routes;