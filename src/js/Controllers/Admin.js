'use strict';

var AdminCtrl = function($scope, $log, UserService) {
    $log.log('AdminCtrl');

    $scope.toto = 'tata';

    $scope.submit = function(){
        UserService.update($scope.toto);
    };
};

module.exports = AdminCtrl;