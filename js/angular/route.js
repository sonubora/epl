myApp.config(['$routeProvider',function($routeProvider){

$routeProvider
.when('/',{

templateUrl: 'views/mainView.html',
controller  : 'mainController',
controllerAs:  'mainCtrl'
})


.when('/statistics',{
 
 templateUrl:  'views/statistics.html',
 controller :  'statController',
 controllerAs: 'statCtrl'
})

.when('/matchDetails/:matchDate/:team1/:team2',{

templateUrl   :'views/matchDetails.html',
controller    :'matchController',
controllerAs  :'matchCtrl'

})

.otherwise({

	template :'<h1> 404 Error :  Page Not Found </h1>'

});



}]);