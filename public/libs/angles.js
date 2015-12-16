var angles = angular.module("angles", []);

angles.chart = function () {
    return { 
        restrict: "A",
        scope: {
            data: "=",
            options: "=",
            id: "@",
            width: "=",
            height: "=",
            resize: "=",
            chart: "@",
            segments: "@",
            responsive: "=",
            tooltip: "=",
            legend: "="
        },
        link: function ($scope, $elem) {
			
            $scope.$watch("data", function (newVal, oldVal) {
				
				if (!newVal) {
                    return;
                } 
               
              var data = {};
              
              $.each($scope.data, function( index, value ){
         	     data[value.city] = data[value.city] ? data[value.city]+1 : 1
              })
              
              var data2 = []
              for (var key in data) {
				  data2.push({city: key, number: data[key]})
		      }
		      
		      data2.sort(function(a, b){
                 return b.number-a.number
              })


              var categories = [];
              var seriesdata = [];
              
              $.each(data2, function( index, value ){
         	     categories.push(value.city);
         	     seriesdata.push(value.number);
              })
              
				$("#chart-regions-container").highcharts({
		  	      chart: {
		  		    type: "column"
		  	      },
			      xAxis: {
				    categories: categories,
				    title: {text: ""}
                  },
			      yAxis: {
				    min: 0,
                    gridLineColor: 'transparent',
                    title: {text: ""},
                      labels: {
                        formatter: function () {
                          return this.value;
                        }
                       }
                    },
			      title: {
				    text: ""
			      },
			      legend: {
				    enabled:false
			      },
			      plotOptions: {
				    column: {
				      tooltip: {
                         pointFormat: 'порушень: <b>{point.y}</b>'
                      }
				    },
                    series: {
                      pointPadding: 0,
                      groupPadding: 0.1,
                    }
			      },
			      series: [{color: "#007FCB",	data:seriesdata}]
		        });
				
				
                }, true);
            
        }
    }
}

angles.directive("barchart", function () { return angles.chart(); });

