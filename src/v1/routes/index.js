'use strict';

const UserActivityRoute = require('./userActivityRoutes');
const DevicesRoute = require('./devicesRoutes');

var routes = [].concat(UserActivityRoute, DevicesRoute);

module.exports = routes;