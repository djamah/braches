
var app = angular.module('app', ['localytics.directives', 'angles']);

app
    .controller('breachesListCtrl', function($scope, $http, $location){
        $http.post('/all_breaches_list', {})
            .success(function(data){
                $scope.list = data;
                console.log($scope.list);
            });
        $scope.options = options;

        $scope.read_more = function(){
            if(!isAdmin){
                location.href = '/breach/'+this.item._id;
            } else {
                location.href = '/admin/breach/'+this.item._id;
            }

        };

        $scope.filters = {
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
            searchLevelFilter: function(item){
//                console.log('searchLevelFilter');
                if($scope.f &&
                    $scope.f.level &&
                    ($scope.f.level.second || $scope.f.level.third || $scope.f.level.fourth ) ){

                    switch (item.level){
                        case 2: if($scope.f.level.second) return true; break;
                        case 3: if($scope.f.level.third) return true; break;
                        case 4: if($scope.f.level.fourth) return true; break;
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

    .controller('breachFormCtrl', function($scope, $http){
        $scope.options = options;
        $scope.submit = function(){
            if($scope.breachForm.$valid){
                $scope.form.level = parseInt($scope.form.level);
                $scope.form.national = ($scope.form.national === 'true');
                $scope.form.research = ($scope.form.research === 'true');
                console.log($scope.form);
                $http.post('send_breach', $scope.form)
                    .success(function(data){
                        $scope.status = 'success';
                    })
                    .error(function(){
                        $scope.status = 'error';
                    });
                $scope.status = 'sending';
            }
        };
    })
    .controller('mapCtrl', function($scope){
        console.log('mapCtrl init');

        $('#map').height(parseInt($(window).height())-185);

        var map;
        var clusterer;

        $scope.$watch('f.city', rePaint);
        $scope.$watch('f.level.second', rePaint);
        $scope.$watch('f.level.third', rePaint);
        $scope.$watch('f.level.fourth', rePaint);
        $scope.$watch('f.national', rePaint);
        $scope.$watch('f.research', rePaint);
        $scope.$watch('f.subject', rePaint);
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
                    if($scope.filters.searchLevelFilter($scope.list[j])){
                        if($scope.filters.searchNationalFilter($scope.list[j])){
                            if($scope.filters.searchResearchFilter($scope.list[j])){
                                if($scope.filters.searchSubjectFilter($scope.list[j])){
                                    filteredData.push($scope.list[j]);
                                }
                            }
                        }
                    }
                }
            }

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
        $scope.$watch('list', toFilter);

        function toFilter(){
            var filteredData = [];

            for(var j in $scope.list){
                if($scope.filters.searchCityFilter($scope.list[j])){
                    if($scope.filters.searchLevelFilter($scope.list[j])){
                        if($scope.filters.searchNationalFilter($scope.list[j])){
                            if($scope.filters.searchResearchFilter($scope.list[j])){
                                if($scope.filters.searchSubjectFilter($scope.list[j])){
                                    filteredData.push($scope.list[j]);
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
            console.log('render chart');
            var dataRegions = [];
            console.log($scope.filteredData, '$scope.filteredData')
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

    });