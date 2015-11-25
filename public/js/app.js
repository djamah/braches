
var app = angular.module('app', ['localytics.directives', 'angles', 'ngFileUpload']);

app
  .directive('modalDialog',  function() {
  return {
    restrict: 'E',
    scope: {
      show: '='
    },
    replace: true, 
    transclude: true, 
    link: function(scope, element, attrs) {
      scope.dialogStyle = {};
      if (attrs.width)
        scope.dialogStyle.width = attrs.width;
      if (attrs.height)
        scope.dialogStyle.height = attrs.height;
      scope.hideModal = function() {
        location.href = '/';
      };
    },
    template: "<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay' ng-click='hideModal()'></div><div class='ng-modal-dialog' ng-style='dialogStyle'><div class='ng-modal-close' ng-click='hideModal()'><img src='/img/controls.png' /></div><div class='ng-modal-dialog-content' ng-transclude></div></div></div>"
  };
})
    .directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function(){
                    scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }])
    .controller("monitCtrl", function($scope, $http){
        $http.post('/admin/all_reports_list', {})
            .success(function(data){
                $scope.reports = data;
            });	
         $scope.updrpt = function(val, index) {
			 $http.post('/admin/update_report', { id: val[0], accepted: !val[1], wrong: true });
			 $scope.reports[index].wrong = true
		 }
		 $scope.clearall = function(){
			 $http.post('/admin/clear_reports', {})
			    .success(function(data){
                $scope.reports = [];
            });	
		 }

})

    .controller('mainCtrl', function($scope, $http){
		$http.post('/all_breaches_list', {})
            .success(function(data){
                $scope.count = data.length;
         });
})
    .controller('contentListCtrl', function($scope, $http, $location){
		  $http.post('/content_list', {})
            .success(function(data){
                $scope.latest = data[0];
                $scope.posts = data.slice(1,data.length-1);
                var chosens = [];
                data.forEach(function(item){
                  if(item.visual === 'expand'){
                    chosens.push(item)
                  } 
                });
                $scope.chosens = chosens;
            });
	})
    .controller('breachesListCtrl', function($scope, $http, $location){
        $http.post('/all_breaches_list', {})
            .success(function(data){
                $scope.list = data;
            });
        $scope.options = options;
        
        $scope.read_more = function(){
			if (typeof(this.item.display)==="undefined"){
				this.item.display=false
			}
            if(!isAdmin){
                this.item.display = this.item.display === false ? true : false;
            } else {
                location.href = '/admin/breach/'+this.item._id;
            }

        };

        $scope.filters = {
            searchFixedFilter: function(item){
                if($scope.f){
                    if($scope.f.fixed === true){
                        if(item.fixed){
                            return true;
                        } else return false;
                    } else return true;
                } else return true;
            },
            searchCityFilter: function(item){
//                console.log('searchCityFilter');
                if($scope.f){
                    if( !$.isEmptyObject($scope.f.city) ){
                        for(var i = 0; i < $scope.f.city.length; i++){
                            if($scope.f.city[i] === item.city){
                                return true;
                            }
                        }
                    } else return true;
                } else return true;
            },
            stateFilter: function(item) {
				if($scope.f && $scope.f.state && ($scope.f.state.accepted || $scope.f.state.declined || $scope.f.state.none )){
                    switch (item.state){
                        case 1: if($scope.f.state.accepted) return true; break;
                        case 2: if($scope.f.state.declined) return true; break;
                        case 0: if($scope.f.state.none) return true; break;
                    }
				} else return true
			},
            searchSubjectFilter: function(item){
//                console.log('searchSubjectFilter');
                if($scope.f){
                    if( !$.isEmptyObject($scope.f.subject) ){
                        for(var i = 0; i < $scope.f.subject.length; i++){
                            if($scope.f.subject[i] === item.subject){
                                return true;
                            }
                        }
                    } else return true;
                } else return true;
            },
            searchOwnerFilter: function(item){
                if($scope.f &&
                    $scope.f.owner &&
                    ($scope.f.owner.gov || $scope.f.owner.com || $scope.f.owner.private ) ){

                    switch (item.owner){
                        case 'gov': if($scope.f.owner.gov) return true; break;
                        case 'com': if($scope.f.owner.com) return true; break;
                        case 'private': if($scope.f.owner.private) return true; break;
                    }

                } else return true;
            },
            searchNationalFilter: function(item){
//                console.log('searchNationalFilter');
                if($scope.f && $scope.f.national){
                    if( item.national ){
                        return true;
                    }
                } else return true;
            },
            searchResearchFilter: function(item){
//                console.log('searchResearchFilter');
                if($scope.f && $scope.f.research){
                    if( item.research ){
                        return true;
                    }
                } else return true;
            }
        }
    })
    
    .controller('questionCtrl', function($scope, $http){
		$scope.submit = function(){
			console.log("Hello")
		}
	})

    .controller('breachFormCtrl', function($scope, $http){
		  $scope.modalShown = false;
   $scope.options = options;
        $scope.getOwner = function(){
            var res = '';
            for(var i in options.city[$scope.form.city]){
                var item = options.city[$scope.form.city][i];
                if(item.name === $scope.form.university.name){
                    res = item.owner;
                }
            }
            return res;
        };
        $scope.submit = function(){
			$scope.submitted = true;
			if (typeof($scope.form.university.name)==='undefined') {
				$scope.breachForm.university.$invalid = true
			}
            if($scope.breachForm.$valid){
                $scope.form.owner = $scope.getOwner();
                $scope.form.national = ($scope.form.national === 'true');
                $scope.form.research = ($scope.form.research === 'true');
                console.log($scope.form);

                var fd = new FormData();
                fd.append('form', JSON.stringify($scope.form));

                if($scope.File){
                    console.log($scope.File,'$scope.File')

                    fd.append('file', $scope.File);

                    $http.post('send_breach', fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    })
                        .success(function(){
							$scope.status = "success";
                            $scope.modalShown = !$scope.modalShown;
                        })
                        .error(function(){
							$scope.status = "error"
							$scope.modalShown = !$scope.modalShown;
                        });
                } else {
                    $http.post('send_breach', fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    })
                        .success(function(data){
							$scope.status = "success";
                            $scope.modalShown = !$scope.modalShown;
                        })
                        .error(function(){
                            $scope.status = 'error';
                            $scope.modalShown = !$scope.modalShown;
                        });
                    $scope.status = 'sending';
                }


            } 
        };
    })
    .controller('mapCtrl', function($scope){
        console.log('mapCtrl init');

        $('#map').height(parseInt($(window).height())-185);

        var map;
        var clusterer;

        $scope.$watch('f.city', rePaint);
        $scope.$watch('f.owner.second', rePaint);
        $scope.$watch('f.owner.third', rePaint);
        $scope.$watch('f.owner.fourth', rePaint);
        $scope.$watch('f.national', rePaint);
        $scope.$watch('f.research', rePaint);
        $scope.$watch('f.subject', rePaint);
        $scope.$watch('f.fixed', rePaint);
        function rePaint(){
            console.log('repaint');
            mapAvailable = true;
            deleteMap();
            init();
        }
        init();
        setTimeout(init,500);
        setTimeout(init,1000);
        setTimeout(init,1500);
        setTimeout(init,2000);
        setTimeout(init,2500);
        setTimeout(init,3000);
        setTimeout(init,3500);
        setTimeout(init,4000);
        setTimeout(init,4500);
        setTimeout(init,5000);
        setTimeout(init,5500);
        setTimeout(init,6000);
        setTimeout(init,6500);
        function deleteMap(){
            if(map && map.destroy){
                map.destroy();
                $('#map').html('');
            }

        };
        function init(){
            if(!mapAvailable || !ymaps.Map) return;
            mapAvailable = false;
            map = new ymaps.Map("map", {
                center: [48.384465, 31.176479],
                zoom: 6,
                controls:[]
            });
            map.controls.add('zoomControl', {
                position:{
                    top: 160,
                    left:20
                }
            });

            var filteredData = [];

            for(var j in $scope.list){
                if($scope.filters.searchCityFilter($scope.list[j])){
                    if($scope.filters.searchOwnerFilter($scope.list[j])){
                        if($scope.filters.searchNationalFilter($scope.list[j])){
                            if($scope.filters.searchResearchFilter($scope.list[j])){
                                if($scope.filters.searchSubjectFilter($scope.list[j])){
                                    if($scope.filters.searchFixedFilter($scope.list[j])){
                                        filteredData.push($scope.list[j]);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            
            $scope.filteredData = filteredData;

            var geoObjects = [];

            for(var i in filteredData){
                if(!filteredData[i].university.geo[0]) continue;
                geoObjects.push( new ymaps.GeoObject({
                    geometry: {
                        type: "Point",
                        coordinates: filteredData[i].university.geo
                    },
                    properties: {
                        clusterCaption: filteredData[i].subject,
                        balloonContentBody: filteredData[i].description+'<br/>'+'<a href="/breach/'+filteredData[i]._id+'">детальніше</a>'
                    }
                }) );
            }
            clusterer = new ymaps.Clusterer({clusterDisableClickZoom: true});
            clusterer.add(geoObjects);
            map.geoObjects.add(clusterer);
        }
    })
    .controller('graphicsCtrl', function($scope){
        console.log('graphicsCtrl init');

        $scope.filteredData = $scope.list;
        $scope.optionsRegions = {
            animation: true
        };
        $scope.$watch('f.city', toFilter);
        $scope.$watch('f.level.second', toFilter);
        $scope.$watch('f.level.third', toFilter);
        $scope.$watch('f.level.fourth', toFilter);
        $scope.$watch('f.national', toFilter);
        $scope.$watch('f.research', toFilter);
        $scope.$watch('f.subject', toFilter);
        $scope.$watch('f.fixed', toFilter);
        $scope.$watch('list', toFilter);

        function toFilter(){
            var filteredData = [];

            for(var j in $scope.list){
                if($scope.filters.searchCityFilter($scope.list[j])){
                    if($scope.filters.searchOwnerFilter($scope.list[j])){
                        if($scope.filters.searchNationalFilter($scope.list[j])){
                            if($scope.filters.searchResearchFilter($scope.list[j])){
                                if($scope.filters.searchSubjectFilter($scope.list[j])){
									if($scope.filters.searchFixedFilter($scope.list[j])){
                                      filteredData.push($scope.list[j]);
                                    }
                                }
                            }
                        }
                    }
                }
            }

            $scope.filteredData = filteredData;

            renderChartReg();
        }
        function in_array(value, name, array){
            for(var i = 0; i < array.length; i++){
                if(array[i][name] === value) return i;
            }
            return false;
        }
        function getRandomColor() {
            var letters = '0123456789ABCDEF'.split('');
            var color = '#';
            for (var i = 0; i < 6; i++ ) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }
        function renderChartReg(){
            $('.pie-legend').remove();
            var dataRegions = [];
            for(var i in $scope.filteredData){
                var index = in_array($scope.filteredData[i].city, 'label', dataRegions);
                if(index===false){
                    dataRegions.push({
                        label: $scope.filteredData[i].city,
                        value: 1
                    });
                } else {
                    dataRegions[index].value++;
                }
            }
            for(var i in dataRegions){
                dataRegions[i].color = getRandomColor();
            }
            $scope.chartReg = dataRegions;
        };

    })    

