'use strict';

global.__webpack_public_path__ = '/';

var angular = require('angular');

module.exports = angular
        .module('boilerplate.services', [])
        .service('UserService', ['$rootScope', '$log', require('js/Services/User')]);