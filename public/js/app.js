
var options = {
    city: {
        'Одеса': [
            "Одеська національна академія  ім. О. С. Попова",
            "Одеський політехнічний університет"
        ],
        'Київ': [
            'Національний університет "Києво-Могилянська академія"',
            'Національний університет ім. Т. Г. Шевченка'
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




var app = angular.module('app', []);

app.controller('breachesListCtrl', function($scope, $http){
    $http.post('/all_breaches_list', {})
        .success(function(data){
            $scope.list = data;
        });
    $scope.options = options;
    setTimeout(function(){console.log($scope.color)}, 5000)
});


app.controller('breachCtrl', function($scope, $http){
    $scope.options = options;

    $scope.submit = function(){
        if($scope.breachForm.$valid){
            $scope.form.level = parseInt($scope.form.level);
            $scope.form.national = ($scope.form.national === 'true');
            $scope.form.research = ($scope.form.research === 'true');
            $http.post('send_breach', $scope.form)
                .success(function(data){
                    console.log(data);
                    $scope.status = 'success';
                })
                .error(function(){
                    $scope.status = 'error';
                });
            console.log($scope);
            $scope.status = 'sending';
        }
    }
});