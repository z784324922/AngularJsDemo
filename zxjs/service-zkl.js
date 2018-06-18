app.factory("$upperFirst",function(){
	return {
		set(str){
			str = str.split("");
			var s =  str.map(function(item,idx){
				if(idx==0){
					item = item.toUpperCase();
					return item;
				}else{
					item = item.toLowerCase();
					return item;
				}
			})
			
			return s.join("");
		}
	}
})