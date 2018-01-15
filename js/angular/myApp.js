var myApp = angular.module("myNgApp",['ngRoute', 'ui.filters','angularUtils.directives.dirPagination']);



myApp.controller('mainController',[ '$http', '$q','$location', function($http, $q,$location){ 

var main = this; 
this.matchDetails=[]; // contails details of all match
this.sortBy='None : Click Table Heading to sort the data';// default value of sort.it will change based on sorting

//this funcn will load all matches details from 2 different json data

this.getAllTheMacthes = function(){ 
var promise1 = $http({method: 'GET', url: 'https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json', cache: 'true'}); 
var promise2 = $http({method: 'GET', url: 'https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json', cache: 'true'}); 


// $q service is used to call two JSON file simultaneously

$q.all([promise1, promise2]).then(function(response){ 

angular.forEach(response[0].data.rounds,function(value,key){
value.name = value.name+' 2015-2016';
});

angular.forEach(response[1].data.rounds,function(value,key){
value.name = value.name+' 2016-2017';
});

main.allMatches = response[0].data.rounds.concat(response[1].data.rounds); 
console.log(main.allMatches) 

angular.forEach(main.allMatches,function(values,key){
main.matchDetails=main.matchDetails.concat(values.matches);
});

console.log(main.matchDetails);
}); //end of $q service 
}; // end of function 

this.getAllTheMacthes(); // calling of function 



// function for routing to matchDetails page while clicking on rows

this.goToMatchDetails = function(match) {
  $location.path('/matchDetails/' + match.date+'/'+match.team1.code+'/'+match.team2.code);
};

    
    
    
    
    

}]); //end of  main controller







// matchController controller


myApp.controller('matchController',['$q','$http','$location','$routeParams',function($q,$http,$location,$routeParams){

var main = this;
this.allMatch=[];
this.matchDetails=[];
this.roundName="";
this.singleMatchData={};


// this funcn will show the details of a particular single match when a particular row is clicked
this.singleMatchDetails=function(){

var promise1 = $http({method: 'GET', url: 'https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json', cache: 'true'}); 
var promise2 = $http({method: 'GET', url: 'https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json', cache: 'true'}); 

 $q.all([promise1,promise2]).then(function(response){

     main.allMatch =response[0].data.rounds.concat(response[1].data.rounds);
     //console.log("merging both array by concat in single array");
     //console.log(main.allMatch);
    angular.forEach(main.allMatch,function(value1,key1){
       angular.forEach(value1.matches,function(value2,key2){

           if((value2.date=== $routeParams.matchDate) && (value2.team1.code===$routeParams.team1) && (value2.team2.code===$routeParams.team2))
           {
            main.singleMatchData=value2;
            main.roundName=value1.name;
           }
       });   // end of for each for value 1
    });     //   end of for each for value 2 
   //console.log(main.singleMatchData);
   //console.log("round name is "+main.roundName);
 }); // end of $q service
};// end of singleMatchDetails funcn

this.singleMatchDetails(); // calling singleMatchDetails Function

}]); // end of match Controller






// statController  controller

myApp.controller('statController',['$http','$q',function($http,$q){

var main = this;
this.allMatch=[];
this.matchDetails=[]; // data of all EPL matches 
this.teamOptionValue="Manchester United"; //  default team of which stat will be shown initially

// funcn to show stats of a particular team

this.getStatistics=function(){

var promise1 = $http({method: 'GET', url: 'https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json', cache: 'true'}); 
var promise2 = $http({method: 'GET', url: 'https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json', cache: 'true'}); 


$q.all([promise1,promise2]).then(function(response){


  main.allMatch =response[0].data.rounds.concat(response[1].data.rounds);

  angular.forEach(main.allMatch,function(value,key1){
      

      main.matchDetails=main.matchDetails.concat(value.matches);

    });     //   end of for each for value  
      
       console.log("getStatistics funcn is loaded initially and data is below");
        console.log(main.matchDetails);

    main.getAllCount(); // calling the count function initailly to show no of matches won,lost,draw for default team
}); // of $q service
}; // end of getStatistics funcn

// funcn to show no of matches won,lost,draw for default team
this.getAllCount =function(){

main.count=0;
main.win=0;
main.lost=0;
main.draw=0;

 console.log("getAllCount Func is loaded now");
 angular.forEach(main.matchDetails,function(value,key){

   if((value.team1.name===main.teamOptionValue && value.score1 > value.score2 ) || (value.team2.name===main.teamOptionValue && value.score2 > value.score1)){
      main.count++;
      main.win++;
      
    }

    else if (( value.team1.name===main.teamOptionValue && value.score1 < value.score2 ) || (value.team2.name===main.teamOptionValue && value.score2 < value.score1)) {

    main.count++;
    main.lost++;

    }

 else if(( value.team1.name===main.teamOptionValue && value.score1 === value.score2 ) || (value.team2.name===main.teamOptionValue && value.score2 === value.score1)){

   main.count++;
   main.draw++;
  }

  }); // end of forEach

};   // end of getAllCount Funcn


// getTeamName() will filter the team from all team which is selected from option and will check either it won,lost or draw

this.getTeamName=function(value){

console.log("getTeamName Funcn is Loaded");

if((value.team1.name===main.teamOptionValue && value.score1 > value.score2 ) || (value.team2.name===main.teamOptionValue && value.score2 > value.score1)){
return 'W';
}
else if (( value.team1.name===main.teamOptionValue && value.score1 < value.score2 ) || (value.team2.name===main.teamOptionValue && value.score2 < value.score1)) {
return 'L';
}
else if(( value.team1.name===main.teamOptionValue && value.score1 === value.score2 ) || (value.team2.name===main.teamOptionValue && value.score2 === value.score1)){
	return 'D';
}
else{

	return"No Data Found";
}
}; // end of getTeamName Funcn

this.getStatistics(); //calling initially


// this funcn will detect the team name everytime when team  is  changed from option while selecting 
 this.changedValue = function(item) {
    main.teamOptionValue=item.team1.name;

      main.getAllCount(); // this funcn will be called each time when team is changed 
      console.log("changedValue is Loaded now");

  };  // end of changedValue Funcn


}]);  // end of stat controller
