'use strict';

global.__webpack_public_path__ = '/';

var angular = require('angular');

require('ionic');
require('ionic-angular');
require('angular-animate');
require('angular-sanitize');

var app = angular.module('boilerplate', [
    'ionic',
    'ui.router',
    require('js/Controllers/Controllers').name,
    require('js/Services/Services').name,
    require('js/Config/Config').name
]);

// Run
app.run(['$rootScope', '$window', '$log', '$ionicSideMenuDelegate', require('./Run')]);

module.exports = app;