angular.module("app.controllers",[])
.controller("listController",function($state,myFormat){
	this.gotoSearch = function(){
		$state.go("tabs.search",{
			firstName:"zuokeliang"
		})
	}
	this.word = myFormat.upper("ADSDSASDASADDSADSA");
})
.controller("detailController",function($stateParams){
	this.id = $stateParams.id;
})
.controller("searchController",function($stateParams){
	this.names = $stateParams.firstName;
})
