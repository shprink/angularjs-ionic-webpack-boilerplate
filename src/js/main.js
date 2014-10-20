'use strict';

var angular = require('angular');

console.log(angular, 'angular');

require('ionic');
require('ionic-angular');
require('angular-ui-router');
require('angular-animate');
require('angular-sanitize');

var app = angular.module('boilerplate', [
    'ui.router'
]);

// controllers
app.controller('HomeCtrl', ['$scope', '$log', require('./Controllers/Home')]);
app.controller('AdminCtrl', ['$scope', '$log', 'UserService', require('./Controllers/Admin')]);

// Services
app.service('UserService', ['$rootScope', '$log', require('./Services/User')]);

// Config
app.config(['$stateProvider', '$urlRouterProvider', require('./Config/Router')]);

// Run
app.run(['$rootScope', '$window', '$log', require('./Run')]);

module.exports = app;