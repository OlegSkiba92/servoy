angular.module('components.servoy-chart', [])
    .directive('servoyChart', [function () {
      return {
        restrict: 'E',
        templateUrl: 'components/servoyChart/servoyChart.html',
        replace: true,
        scope: {
          firstLine: "=",
          secondLine: "=",
          title: "="
        },
        controller: 'servoyChartCtrl',
        link: function (scope, element, attr) {
          var sizeChart = 35;
          var sizeChart2 = 15;

          var visibleChart = angular.element(element[0].querySelector('.visible-chart'));
          var number = angular.element(element[0].querySelector('.number'));
          var chart1 = {
            chart: angular.element(element[0].querySelector('.chart')),
            slice: angular.element(element[0].querySelector('.chart .slice > span')),
            chartCenter: angular.element(element[0].querySelector('.chart .chart-center'))
          };
          var chart2 = {
            chart: angular.element(element[0].querySelector('.chart2')),
            slice: angular.element(element[0].querySelector('.chart2 .slice > span')),
            chartCenter: angular.element(element[0].querySelector('.chart2 .chart-center'))
          };

          var width = element[0].clientWidth;
          var widthChart2 = (width - sizeChart * 2)-20;

          element.css({
            'padding-bottom': width / 7 + 'px'
          });

          visibleChart.css({
            height: width / 2 + 'px'
          });

          number.css({
            top: sizeChart + 'px',
            left: sizeChart + 'px',
            width: (width - sizeChart * 2) + 'px',
            height: (width - sizeChart * 2) + 'px',
            'line-height': (width - sizeChart * 2) + 'px',
            'font-size': (width - sizeChart * 2) / 3 + 'px'
          });


          chart1.chart.css({
            width: width + 'px',
            height: width + 'px'
          });

          chart1.slice.css({
            'border-bottom-left-radius': width / 2 + 'px',
            'border-bottom-right-radius': width / 2 + 'px'
          });

          chart1.chartCenter.css({
            top: sizeChart + 'px',
            left: sizeChart + 'px',
            width: (width - sizeChart * 2) + 'px',
            height: (width - sizeChart * 2) + 'px'
          });


          chart2.chart.css({
            width: widthChart2 + 'px',
            height: widthChart2 + 'px',
            top: sizeChart+10 + 'px',
            left: sizeChart+10 + 'px'
          });

          chart2.slice.css({
            'border-bottom-left-radius': widthChart2 / 2 + 'px',
            'border-bottom-right-radius': widthChart2 / 2 + 'px'
          });

          chart2.chartCenter.css({
            top: sizeChart2 + 'px',
            left: sizeChart2 + 'px',
            width: (widthChart2 - sizeChart2 * 2) + 'px',
            height: (widthChart2 - sizeChart2 * 2) + 'px'
          });
        }
      }
    }])
    .controller('servoyChartCtrl', ['$scope',
      function ($scope) {
      $scope.Math = window.Math;
        $scope.calculateFirst = function (data) {
          data = (data < -100) ? -100 : ((data > 100) ? 100 : data);
          return {
            '-webkit-transform': 'rotate(' + (data + 100) / 200 * 180 + 'deg)',
            'transform': 'rotate(' + (data + 100) / 200 * 180 + 'deg)'
          }
        };

        $scope.calculateSecond = function (data) {
          data = (data < 0) ? 0 : ((data > 100) ? 100 : data);
          return {
            '-webkit-transform': 'rotate(' + data / 100 * 180 + 'deg)',
            'transform': 'rotate(' + data / 100 * 180 + 'deg)'
          }
        };
      }
    ]);