var pookApp = angular.module('pookApp', ['ngResource', 'ui.bootstrap']);
var interval = null;
var durationInSec = 15 *60; // 15 min. *60 sec = 900 sec

function GetDataFile(file, $resource)
{
    return $resource(file + '.json');    
}

pookApp.controller('UsersCtrl', ['$scope', '$resource', '$interval', function ($scope, $resource, $interval) {

  	  $scope.alerts = [  ];
  	  $scope.progressValue = 100;
     	

	  init();                        
      function init() {  
  		
  		// Only with a server (not local): 
  		// GetDataFile('/users', $resource).get( function(data) { $scope.users = data.users; }); 

  		 $scope.users = 
					[
				    {"id": 1, "username": "Paul" },
				    {"id": 2, "username": "Stéphane" },
				    {"id": 3, "username": "Christophe" },
				    {"id": 4, "username": "Chloe"},
				    {"id": 5, "username": "Caroline" },
				    {"id": 6, "username": "Nicolas"},
				    {"id": 7, "username": "Romain"},
				    {"id": 8, "username": "Ludo"},
				    {"id": 9, "username": "Galbis"}
				];		    	  		 
      }

	    $scope.addAlert = function(username, id, index) { 
    	   	$scope.alerts.push( { type: 'alert', msg: username, id:id, index:index} ); 
	       	
	       	if ($scope.alerts.length==0)       	
	       	{
	       		if (interval!=null)	 			
					$interval.cancel(interval);
	       	}
	       	else if ($scope.alerts.length==1)       	
	       	{
	 			$scope.progressValue = 100;				 			 			
				if (interval == null)	 								
				{
					interval = $interval(function(){
		       	 		
		       			if (0 < $scope.progressValue)
		    				$scope.progressValue -= 2; //;100/durationInSec; 
		    			else
		    			{
		    				$scope.alerts.splice(0, 1); 
		    				if ($scope.alerts.length==0)      
		    				{
		    					$interval.cancel(interval);
		    					interval = null;
		    				}
		    				$scope.progressValue = 100;		    				
		    			}
					}, 1000);
	    		}
	    	}
  		}

  		$scope.closeAlert = function(index) { 
  			$scope.alerts.splice(index, 1); 
  			if (index==0)
		    	$scope.progressValue = 100;
  		};

} ]);