angular.module('servoy')
    .config(['$stateProvider', '$urlRouterProvider',
      function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
              url: "/home",
              templateUrl: "templates/home/home.html",
              controller: "homeCtrl"
            });

        //rerouting
        $urlRouterProvider.otherwise('/home');
      }
    ]);