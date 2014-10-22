'use strict';

require('angular-ui-router');

var RouterConfig = function($stateProvider, $urlRouterProvider) {
    $stateProvider
            .state('root', {
                url: '',
                abstract: true,
                views: {
                    "scaffolding": {
                        template: require('views/scaffolding.html')
                    },
                    "menu@root": {
                        template: require('views/menu.html')
                    },
                    "header@root": {
                        template: require('views/header.html')
                    }
                }
            })
            .state('root.home', {
                url: "/home",
                views: {
                    "content": {
                        template: require('views/Home/content.html'),
                        controller: 'HomeCtrl'
                    }
                }
            })
            .state('root.profile', {
                url: "/profile",
                views: {
                    "content": {
                        template: require('views/Profile/content.html'),
                        controller: 'ProfileCtrl'
                    }
                }
            });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/home');
};

module.exports = RouterConfig;