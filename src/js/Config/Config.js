'use strict';

global.__webpack_public_path__ = '/';

var angular = require('angular');

module.exports = angular
        .module('boilerplate.config', [])
        .config(['$stateProvider', '$urlRouterProvider', require('js/Config/Router')]);