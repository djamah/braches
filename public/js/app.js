
var options = {
    city: {
        'Одеса': [
            {
                name: 'Одеська національна академія  ім. О. С. Попова',
                geo: []
            },
            {
                name: "Одеський політехнічний університет",
                geo: []
            }
        ],
        'Київ': [
            {
                name: 'Національний університет "Києво-Могилянська академія"',
                geo: []
            },
            {
                name: 'Національний університет ім. Т. Г. Шевченка',
                geo: []
            }
        ],
        'Чернігів': [
            {
                name: 'Чернігівський національний університет',
                geo: []
            },
            {
                name: 'Чернігівська академія',
                geo: []
            }
        ]
    },
    subjects: [
        "оплата праці",
        "побутові умови праці",
        "відпустка",
        "робочий час та норми навантаження",
        "вільний вибір методів та засобів навчання в межах затверджених навчальних планів",
        "наукова діяльність у вищих навчальних закладах",
        "забезпечення житлом та одержання службового житла",
        "пільгові кредити для індивідуального чи кооперативного житлового будівництва",
        "одержання державних стипендій",
        "підвищення кваліфікації",
        "інтелектуальна власність",
        "конкурс на заміщення посади та прийом на роботу",
        "участь у професійних спілках та у громадському самоврядуванні ВНЗ"
    ]
};

options.cities = (function(){
    var res = [];
    for(var i in options.city){
        if(options.city.hasOwnProperty(i))
            res.push(i);
    }
    return res;
})();




var app = angular.module('app', ['localytics.directives']);

app
    .controller('breachesListCtrl', function($scope, $http, $location){
        $http.post('/all_breaches_list', {})
            .success(function(data){
                $scope.list = data;
                console.log($scope.list);
            });
        $scope.options = options;

        $scope.read_more = function(){
            location.href = '/breach/'+this.item._id;
        };

        $scope.filters = {
            searchCityFilter: function(item){
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
                if($scope.f && $scope.f.national){
                    if( item.national ){
                        return true;
                    }
                } else return true;
            },
            searchResearchFilter: function(item){
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
    });