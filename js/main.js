// Code goes here
'use strict';
var App = angular.module('App',['ui.bootstrap']);

 App.controller('mainCtrl',function($scope,$filter,$http,$timeout,$interval,$log){
         
//Apply sort to columns  
     $scope.sort = function(key){
     $scope.sortKey = key;
     $scope.reverse = !$scope.reverse;
         
    };
   
    $log.info("App started!"); 
    var loadTime = 30000, //Load the data every 30 second
    errorCount = 0,
    loadPromise; 
// HTTP call to backend
var getData = function() {       
 $http.get('/mockResp').success(function(response){
     
     $scope.data = response;
      errorCount = 0;
      console.log($scope.data.sensorList.length);
      nextLoad(30000);
    }).then($scope.callBack)
    .error(function(res) {
      $scope.data = 'Server error';
      nextLoad(++errorCount * 2 * loadTime);
    });
  };
 var cancelNextLoad = function() {
    $interval.cancel(loadPromise);
  };
  var nextLoad = function(mill) {
    mill = mill || loadTime;
    cancelNextLoad();
    loadPromise = $interval(getData, mill);
     
// Trigger $watch to keep track for moving sensors
/*angular.forEach($scope.data.sensorList,function(val,key){
        
$scope.$watch('data.sensorList['+key+']',function(newval,oldval){
      //  console.log($scope.data.sensorList.length);
        console.log("Id- ", $scope.data.sensorList[key].id + " " + 'OldX' ,oldval["x-coord"] + " " + 'NewX' ,newval["x-coord"]);
          
             if(oldval["x-coord"] != newval["x-coord"]){
                $log.warn("x-coord changed from " + oldval["x-coord"] + " to" + newval["x-coord"] );
                 }
      }); 
    });  */
  };  
  


  //Start polling the data from the server
  getData();

  // Clear timeout when view is destroyed to stop polling
$scope.$on('$destroy', function() {
    cancelNextLoad();
  });
 // Add pagination  
     $scope.totalItems = 8;
     //console.log("Len",$scope.totalItems);
     $scope.currentPage = 1;
     $scope.numPerPage = 5;
     $scope.paginate = function(value){
         var begin,end,index;
         begin = ($scope.currentPage - 1) * $scope.numPerPage;
         end = begin + $scope.numPerPage ;
         index = $scope.data.sensorList.indexOf(value);
         return (begin <= index && index < end);
         
     };
     
     
    
    
}); 



 

  
   