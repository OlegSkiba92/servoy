angular.module('servoy')
    .controller('homeCtrl', ['$scope',
      function ($scope) {
        $scope.first = 52;
        $scope.second = 12;
        $scope.title = 'Divisie NPS';
      }
    ]);