var app = angular.module("app",["ui.router",'ionic'])

app.run(function($rootScope){
	$rootScope.showFoot = true;
	
	$rootScope.$on("$stateChangeSuccess",(e,toState,toParams,fromState,fromParams)=>{
		console.log(toState);
		var url = toState.url;
		console.log(url);
		
		var length = url.split("/").length;
		
		if(length>2){
			$rootScope.showFoot = false;
		}else{
			$rootScope.showFoot = true;
		}


		var title = toState.title;
		console.log(title);

		$rootScope.$emit("sendTitle",title,fromState);
	});


	$rootScope.$on("$viewContentLoaded",(e)=>{
		console.log(e);

	})
});

//  路由重定向 
app.config(function($urlRouterProvider){
	$urlRouterProvider.otherwise("/tab/wx")
})
// 去除url 地址的 #
// 不能刷新页面  
app.config(function($locationProvider){
	 // $locationProvider.html5Mode(true)
})
// 不区分大小写
app.config(function($urlMatcherFactoryProvider){
	$urlMatcherFactoryProvider.caseInsensitive(true)
})

app.config(function($stateProvider){
	$stateProvider
		.state("tabs",{
			url:"/tab",
			abstract:true,  //声明父级路由
			views:{
				"tabsview":{
					templateUrl:"../view/tabs.html"
				},
				"headerviews":{
					templateUrl:"../view/tab-header.html",
					controller:"headerController",
					controllerAs:"headerCtrl"
				}
			}
		})
		.state("tabs.wx",{
			url:"/wx",
			title:"微信",
			views:{
				'wx-tab':{
					templateUrl:"../view/tab-wx.html"
				}
			}
		})
		.state("tabs.phone",{
			url:"/phone",
			title:"通讯录",
			views:{
				"phone-tab":{
					templateUrl:"../view/tab-phone.html",
					controller:"phoneController",
					controllerAs:"phoneCtrl",
					resolve:{
						getListInfo:function($http,$timeout){
							return $http({
								url:"../data/person.cfm",
								method:"get",
								params:{
									id:1
								}
							}).then((res)=>{
								console.log(res.data);
								return $timeout(function(){
									return res.data
								},0)
							})
						}
					}
				}
			}
		})
		.state("tabs.find",{
			url:"/find",
			title:"发现",
			views:{
				"find-tab":{
					templateUrl:"../view/tab-find.html",
					controller:"findController",
					controllerAs:"findCtrl"
				}
			}
		})
		.state("tabs.mine",{
			url:"/mine",
			title:"我的",
			views:{
				"mine-tab":{
					templateUrl:"../view/tab-mine.html",
					controller:"mineController",
					controllerAs:"mineCtrl"
				}
			}
		})
		.state("detail",{
			url:"/detail", 
			abstract:true,
			views:{
				"headerviews":{
					templateUrl:"../view/tab-header.html",
					controller:"headerController",
					controllerAs:"headerCtrl"
				},
				"detailviews":{
					templateUrl:"../view/details-html"
				}
			}
		})
		.state("tabs.detail",{
			
			url:"/detail/:id/:name?",
			
			views:{
				"phone-tab":{
					templateUrl:"../view/tab-detail.html",
					controller:"detailController",
					controllerAs:"detailCtrl"
				}
			}
		})
		.state("tabs.search",{
			url:'/search/:firstName?/:info',
			views:{
				"phone-tab":{
					templateUrl:"../view/tab-search.html",
					controller:"searchController",
					controllerAs:"searchCtrl"
				}
			}
		})
		.state("tabs.visit",{
			url:"/visit/:id/:cityName?",
			views:{
				"mine-tab":{
					templateUrl:"../view/tab-visit.html",
					controller:"visitController",
					controllerAs:"visitCtrl"
				}
			}
		})
//		.state("header",{
//			url:"/header",
//			views:{
//				"headerviews":{
//					templateUrl:"../view/tab-header.html",
//					controller:"headerController",
//					controllerAs:"headerCtrl"
//				}
//			}
//		})
})