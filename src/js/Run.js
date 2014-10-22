'use strict';

module.exports = function($rootScope, $window, $log, $ionicSideMenuDelegate) {
    $log.debug('Running');

    $rootScope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };
};