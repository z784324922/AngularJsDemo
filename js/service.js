angular.module("app.service",[])
.service("myFormat",function(){
	this.upper = function(e){
		e = e.split("");
		for(var i=0;i<e.length;i++){
			if(i==0){
				e[i]= e[i].toUpperCase();
			}else{
				e[i] = e[i].toLowerCase();
			}
		}
		return e.join("");
	}
})
