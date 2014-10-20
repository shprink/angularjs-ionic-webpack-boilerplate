'use strict';

var RouterConfig = function($stateProvider, $urlRouterProvider) {
    $stateProvider
            .state('root', {
                url: '',
                abstract: true,
                views: {
                    "scaffolding": {
                        templateUrl: 'views/scaffolding.html'
                    },
                    "menu@root": {
                        templateUrl: 'views/menu.html'
                    },
                    "header@root": {
                        templateUrl: 'views/header.html'
                    }
                }
            })
            .state('root.home', {
                url: "/home",
                views: {
                    "content": {
                        templateUrl: 'views/Home/content.html',
                        controller: 'HomeCtrl'
                    }
                }
            })
            .state('root.admin', {
                url: "/admin",
                views: {
                    "content": {
                        templateUrl: 'views/Admin/content.html',
                        controller: 'AdminCtrl'
                    }
                }
            });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/home');
};

module.exports = RouterConfig;