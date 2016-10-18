angular.module('servoy')
    .controller('homeCtrl', ['$scope',
      function ($scope) {
        $scope.first = 75;
        $scope.second = 45;
        $scope.title = 'Division NPS';
      }
    ]);