'use strict';
var mockApp = angular.module('myApp',['App','ngMockE2E']);
 mockApp.run(function($httpBackend){
     var $scope = {};
   var mockResp = {
	"time": "dd-mm-yyyy, hh:mm:ss.xxx",
	"sensorList": [{
		"id": 101,
		"x-coord": 45.6754,
		"y-coord": 56.7354,
		"tags": ["red", "large", "patrick"],
		"status": "ok"
	}, {
		"id": 120,
		"x-coord": 45.3423,
		"y-coord": 56.7890,
		"tags": ["blue", "large", "bateman"],
		"status": "ok"
	}, {
		"id": 130,
		"x-coord": 45.5754,
		"y-coord": 56.2345,
		"tags": ["red", "medium", "jack"],
		"status": "bad"
	}, {
		"id": 165,
		"x-coord": 45.6533,
		"y-coord": 56.1234,
		"tags": ["blue", "small", "bauer"],
		"status": "ok"
	}, {
		"id": 203,
		"x-coord": 45.9865,
		"y-coord": 56.4567,
		"tags": ["yellow", "small", "bauer"],
		"status": "ok"
	},{
		"id": 156,
		"x-coord": 40.65,
		"y-coord": 50.98,
		"tags": ["blue", "small", "bauer"],
		"status": "ok"
	},{
		"id": 175,
		"x-coord": 38.88,
		"y-coord": 52.34,
		"tags": ["blue", "small", "bauer"],
		"status": "ok"
	},{
		"id": 178,
		"x-coord": 15.6533,
		"y-coord": 16.1234,
		"tags": ["blue", "small", "bauer"],
		"status": "ok"
	},]
};
    var updateTime = function() {  
    var currDate = new Date();
    var currTime = currDate.getTime();
    var currDD = currDate.getDate();
    var currMM = currDate.getMonth();
    var currMin = currDate.getMinutes();
    var currHour = currDate.getHours();
    var currSec = currDate.getSeconds();
    var currDay  = currDate.getDay();
    var currYY = currDate.getFullYear();
    var currTT = currDate.toLocaleTimeString();
    mockResp.time =  currMM + "-" + currDD +  "-" + currYY + "," +
       currTT;
       }
    updateTime();
   $httpBackend.whenGET('/mockResp').respond(mockResp);
    
// Update x/y coord every 30 secs
     $scope.update = function(){
         var x = (Math.random() * 60) + 1;
         var y = (Math.random() * 60) + 1;
         var xCoord = Number(x.toFixed(2));
         var yCoord = Number(y.toFixed(2));
         
         console.log('xCoord', xCoord );
         console.log('yCoord', yCoord );
         mockResp.sensorList[0]["x-coord"] = xCoord;
         mockResp.sensorList[0]["y-coord"] = yCoord;
         updateTime();
         console.log(mockResp.sensorList[0]);
         }
     setInterval($scope.update,30000);
    }); 

    
