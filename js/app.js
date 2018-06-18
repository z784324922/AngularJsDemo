var  app = angular.module("app",['ui.router','app.controllers','app.service'])
.run(function($rootScope,$log){
	$rootScope.$on("$stateChangeSuccess",function(event,toState,toParams,fromState,fromParams){
		var viesName;
		var oIndex = 0;
		for(var i in toState.views){
			viesName = i;
		}
		switch(viesName){
			case "home-tab":
			oIndex = 0;
			break;
			case "list-tab":
			oIndex = 1;
			break;
			case "car-tab":
			oIndex = 2;
			break;
			case "show-tab":
			oIndex = 3;
			break;
			case "my-tab":
			oIndex = 4;
			break;
			default:;
		}
		
		var oLi = angular.element(document.querySelectorAll(".footli"));
		console.log(angular.element(document.querySelectorAll(".footli")).length)
		// angular.element ==>类似jquery
		// 1. 直接引入jquery 
		// 2. angular.element  ===>jquery
		// 3. jquery 对象  ===>dom对象      id="box"     
		// jquery  $("#box")     
		// dom     var box = document.getElementById("box");
		// $("#box")[0]     $("#box").get(0)    jquery==>dom   sizzle搜索引擎 
		// dom ==>jquery  $(box) 
		for(var i=0;i<$(".footli").length;i++){
//			$(".footli").eq(i).removeClass("active");
			oLi.eq(i).removeClass("active");
		}
		oLi.eq(oIndex).addClass("active");
//		$(".footli").eq(oIndex).addClass("active");
	})
})
.config(function($urlRouterProvider) {
		$urlRouterProvider.otherwise("/tab/home");   //跳转url
})
.config(function($stateProvider){
	$stateProvider
		.state("tabs",{
			url:"/tab",
			abstract:true,
			templateUrl:"tpl/20.5/tabs.html"
		})
		.state("tabs.home",{
			url:"/home",
			views:{
				'home-tab':{
					templateUrl:"tpl/20.5/home.html"
				}
			}
		})
		.state("tabs.list",{
			url:"/list",
			views:{
				'list-tab':{
					templateUrl:"tpl/20.5/list.html",
					controller:"listController",
					controllerAs:"listCtrl"
				}
			}
		})
		.state("tabs.car",{
			url:"/car",
			views:{
				'car-tab':{
					templateUrl:"tpl/20.5/car.html"
				}
			}
		})
		.state("tabs.show",{
			url:"/show",
			views:{
				"show-tab":{
					templateUrl:"tpl/20.5/show.html"
				}
			}
		})
		.state("tabs.my",{
			url:"/my",
			views:{
				'my-tab':{
					templateUrl:"tpl/20.5/my.html"
				}
			}
		})
		.state("tabs.detail",{
			url:"/detail/:id",
			views:{
				"list-tab":{
					templateUrl:"tpl/20.5/detail.html",
					controller:"detailController",
					controllerAs:"detailCtrl"
				}
			}
		})
		.state("tabs.search",{
			url:"/search/:firstName?",
			views:{
				"list-tab":{
					templateUrl:"tpl/20.5/search.html",
					controller:"searchController",
					controllerAs:"searchCtrl"
				}
			}
		})
})