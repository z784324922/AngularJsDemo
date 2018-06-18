
app.controller("phoneController",function($scope,$state,getListInfo){
	console.log("phonephonephone");

	this.title = "通讯录";
	this.list = getListInfo;

	// 刷新路由

	// console.log($state);

	this.reload = function(){
		$state.reload();
	}

	// $scope.$emit("sendTitle",this.title);

	this.search = function(firstName){
		console.log(firstName);
		var info = "work-hard";
		$state.go("tabs.search",{
			info:info,
			firstName:firstName
		})
	}
})

app.controller("detailController",function($state,$stateParams,$http,$scope,$rootScope){
	console.log($state);
	console.log($stateParams)   //ui.router 路由参数

	this.firstName = $stateParams.name;
	this.id = $stateParams.id;
	
	$scope.$on("$stateChangeSuccess",(e,toState,toParams,fromState,fromParams)=>{
		console.log(fromState);
		$rootScope.$emit("sendTitle",this.firstName,fromState);
	})

	$scope.$emit("sendTitle",this.firstName);  //title发送过去
	$http({
		url:"../data/personDetail.cfm",
		method:"get"
	}).then((res)=>{
		var data = res.data.id;
		console.log(data);
		this.personInfo = data[this.id];  //key-value
		console.log(this.personInfo);
	});
})


app.controller("mineController",function($scope,$state){
	this.title = "我的";
	this.cityList = [
		{
			name:"东京",
			id:1
		},
		{
			name:"马尔代夫",
			id:2
		},
		{
			name:"迪拜",
			id:3
		},
		{
			name:"海南",
			id:4
		},
		{
			name:"成都",
			id:5
		}
	];
	this.gotoVisit = function(id,name){
		console.log(id,name);

		// $state.go
		// $state.go("visit",{
		// 	id:id,
		// 	cityName:name
		// })
		
	}
})

app.controller("visitController",function($stateParams,$rootScope,$scope){
	this.title = $stateParams.cityName;
	this.cityId = $stateParams.id;
	
//	$rootScope.$emit("sendTitle",this.title);

	$scope.$on("$stateChangeSuccess",(e,toState,toParams,fromState,fromParams)=>{
		console.log(fromState);
			$rootScope.$emit("sendTitle",this.title,fromState);
	})
})

app.controller("searchController",function($stateParams,$state,$scope,$upperFirst,$http){
	this.firstName = $stateParams.firstName;
	var empArr = [];
	this.show = false;
	if(this.firstName){
		this.title = this.firstName;
		$scope.$emit("sendTitle",this.title);
		this.firstName = $upperFirst.set(this.firstName);
		$http({
			url:"../data/personsearch.cfm",
			method:"get",
			params:{
				firstName:this.firstName
			}
		}).success((res)=>{
			console.log(res);
			// 判断 输入 姓 是否正确  
			var mydata = res.firstName;
			console.log(mydata);
			for(var i in mydata){
				if(i==this.firstName){
					empArr.push(mydata[i])
				}
			};
			console.log(empArr);
			if(empArr[0]){
				this.empList = empArr;
			}else{
				this.show = true;
			}

		})

	}else{
		this.title = "查询全部员工信息";
		$scope.$emit("sendTitle",this.title);
		$http({
			url:"../data/personsearch.cfm",
			method:"get"
		}).success((res)=>{
			this.empList = res.firstName;
		})
	}

})

app.controller("headerController",function($scope,$rootScope,$state){
	this.title = "微信";
	$rootScope.$on("sendTitle",(e,data,from)=>{

		this.title = data;
		this.fromTitle = from.title;
		this.from = from.name;
	})
	
	this.goBack = function(){
		console.log(this.from);
		$state.go(this.from);
	}
})


app.controller("findController",function($scope,$timeout,$http){
	
	var items = [
    {
      title: 'item1',
      description: 'item1 description'
    },
    {
      title: 'item2',
      description: 'item2 description'
    },
    {
      title: 'item3',
      description: 'item3 description'
    },
    {
      title: 'item4',
      description: 'item4 description'
    },
    {
      title: 'item5',
      description: 'item5 description'
    },
    {
      title: 'item6',
      description: 'item6 description'
    },
    {
      title: 'item7',
      description: 'item7 description'
    },
    {
      title: 'item8',
      description: 'item8 description'
    },
    {
      title: 'item9',
      description: 'item9 description'
    },
    {
      title: 'item10',
      description: 'item10 description'
    }
  ];

  this.items = items;

  this.refresh = function(){
  	//  下拉刷新

  	$timeout(()=>{
  		$http.get("../mock/new-items.json",{})
  			.then((res)=>{
  				console.log(res.data);

  				this.items = res.data;
  					// 往外发送事件 通知 滑动完毕 
  				$scope.$broadcast("scroll.refreshComplete")
  			})
  	},2000)
  }

  this.pulling = function(){

  }

  this.loadMore = function(){
  	// 上拉加载更多 ajax

  	$timeout(()=>{
  		$http.get("../mock/more-items.json",{})
  			.then((res)=>{
  				this.items = this.items.concat(res.data);

  				$scope.$broadcast("scroll.infiniteScrollComplete")
  			})
  	},1500)
  }

})