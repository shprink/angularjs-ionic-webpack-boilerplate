'use strict';

var Run = function($rootScope, $window, $log) {
    $log.log('Running');

    $rootScope.toggleLeft = function() {

    };

    // Injector
    $window.injector = angular.injector(['ng']);
};

module.exports = Run;