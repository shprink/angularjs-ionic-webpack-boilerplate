'use strict';

module.exports = function($scope, $log, UserService) {
    $log.debug('ProfileCtrl');
    $scope.getCurrentUser = UserService.getCurrent();
};