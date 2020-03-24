(function(w){
	
	w.transformCss = function (node,name,value){
			//准备一个对象，存 名值对
			if(!node.aaa){
				//对象动态创建属性    对象名.属性名 = 属性值
				node.aaa = {};				
			};
						
			//写
			//实参：arguments
			if(arguments.length > 2){
				//把 名值对 放到对象中				
				node.aaa[name] = value; //{translateX: 200, scale: 0.5}		
				//node.aaa.name = 'value';  === {name: "value"}										
				var result = '';				
				//对象中的属性名  == 枚举对象中的属性名
				for(var i in node.aaa){											
					switch (i){
						case 'translateX':
						case 'translateY':
						case 'translate':
						case 'translateZ':
							result +=  i +'('+ node.aaa[i]+'px) ';	//translateX(200px)						
							break;
						case 'scaleX':
						case 'scaleY':
						case 'scale':
							result +=  i +'('+ node.aaa[i]+') ';//scale(0.5)
							break;	 
						case 'rotate':
						case 'skewX': 
						case 'skewY':
						case 'skew':
							result +=  i +'('+ node.aaa[i]+'deg) ';//rotate(360deg)
							break;	
					};
				};
				
				node.style.transform = result;
				
			}else{
				//读
				
				if(typeof node.aaa[name] == 'undefined'){
					//默认状态
					//scale 类
					if(name == 'scale' || name == 'scaleX' || name == 'scaleY'){
						value = 1;
					}else{
						//translate rotate
						value = 0;
					};
					
				}else{
					//正常情况
					value = node.aaa[name];
				};
				
				return value;
				
			};
			
			
		};

	
})(window);

		