angular.module('components.servoy-chart', [])
    .run(function(){
      var style =".servoy-chart{position:relative;background:inherit;color:#1C3857;font-family:Arial;overflow:hidden}.servoy-chart span.circle{height:6px;width:6px;border:1px solid rgba(0,0,0,.5);margin:0 auto 5px;border-radius:50%;display:block}.servoy-chart .visible-chart{background:0 0;overflow:hidden;position:relative}.servoy-chart .chart,.servoy-chart .chart2{background:#fff;border-radius:50%;position:absolute;overflow:hidden}.servoy-chart .chart .slice,.servoy-chart .chart2 .slice{-webkit-transform:rotate(0);transform:rotate(0);width:100%;height:100%;transition:transform .5s ease}.servoy-chart .chart .slice>span,.servoy-chart .chart2 .slice>span{position:absolute;top:50%;left:0;width:100%;height:50%;background:#40B1D9}.servoy-chart .chart .chart-center,.servoy-chart .chart2 .chart-center{background:#E8F0F3;position:absolute;border-radius:50%}.servoy-chart .number{position:absolute;border-radius:50%;text-align:center;font-weight:700;background:inherit}.servoy-chart .number span.title{position:absolute;font-size:13%;line-height:1;width:100%;left:0;margin-top:25%}.servoy-chart .number span.sign{font-size:40%;vertical-align:bottom;position:absolute;left:20%;font-weight:400;line-height:1;top:40%}.servoy-chart .chart .chart-center:after{left:-28px;top:50%;margin-top:-10px;position:absolute;border:10px solid transparent;border-right:18px solid #1C3857;content:' '}.servoy-chart .chart2{background:0 0}.servoy-chart .chart2 .slice>span{background:#98CB80}.servoy-chart .chart2 .chart-center{background:#E8F0F3}";
      var css = document.createElement("style");
      css.type = "text/css";
      css.innerHTML = style;
      document.body.appendChild(css);
    })
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
          var sizeChart = 33;
          var sizeChart2 = 14;

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
          var widthChart2 = (width - sizeChart * 2)-26;

          element.css({
            'padding-bottom': width / 7 + 'px'
          });

          visibleChart.css({
            height: width / 2 + 'px'
          });

          number.css({
            top: sizeChart + 11 + 'px',
            left: sizeChart + 'px',
            width: (width - sizeChart * 2) + 'px',
            height: (width - sizeChart * 2) + 'px',
            'line-height': (width - sizeChart * 2) + 'px',
            'font-size': (width - sizeChart * 2) / 3 + 8 + 'px'
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
            top: sizeChart+13 + 'px',
            left: sizeChart+13 + 'px'
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
          data = (data < -100) ? -100 : ((data > 100) ? 100 : data);
          return {
            '-webkit-transform': 'rotate(' + (data + 100) / 200 * 180 + 'deg)',
            'transform': 'rotate(' + (data + 100) / 200 * 180 + 'deg)'
          }
        };
      }
    ]);