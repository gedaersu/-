(function(w){
	w.drag = function (navsWrap,callback){
//			var navsWrap = document.getElementById('wrap');
//			var navsList = document.getElementById('inner');
			//父元素中的第一个子元素(剔除文本之后的子元素)
			var navsList = navsWrap.children[0];
			
			transformCss(navsList,'translateZ',0.1)
			
			var eleY = 0;
			var startY = 0;
			
			//加速变量
			//初始位置
			var S1 = 0;
			// 结束位置
			var S2 = 0;
			//初始时间
			var T1 = 0;
			//结束时间
			var T2 = 0;
			//距离差
			var SValue = 0;
			//时间差
			var　TValue = 1;
			
			var Tween = {
				//中间部分 == 匀速
				Linear: function(t,b,c,d){ return c*t/d + b; },
				//回弹
				easeOut: function(t,b,c,d,s){
		            if (s == undefined) s = 1.70158;
		            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
		        }
				
			};
			
			//定时器
			var timer = 0;
			
			//防抖动
			var startX = 0;
			var isFirst = true;
			var isY = true;
			
			navsWrap.addEventListener('touchstart',function(event){
				var touch = event.changedTouches[0];
				
				//即点即停
				clearInterval(timer);
				
				//清除过渡
				navsList.style.transition = 'none';
				
				eleY = transformCss(navsList,'translateY');
				startY = touch.clientY;
				startX = touch.clientX;
				
				//初始位置
				S1 = eleY;
				//初始时间   getTime() 毫秒
				T1 = new Date().getTime();
				
				//清除上一次的位移值
				SValue = 0;
				
				//检测callback
				if(callback && callback['start']){
					callback['start']();
				};
				
				//上一次是数值清空
				isFirst = true;
				isY = true;
				
			});
			navsWrap.addEventListener('touchmove',function(event){
				var touch = event.changedTouches[0];
				
				if(!isY){
					return;
				}
				
				var endY = touch.clientY;
				var endX = touch.clientX;
				//手指距离差
				var disY = endY - startY;
				var disX = endX - startX;
				
				//防抖动
				if(isFirst){
					isFirst = false;
					if(Math.abs(disX) > Math.abs(disY)){
						isY = false;
						return;
					};
				}
				
				
				
				//范围限定
				//橡皮筋 拖动    越来越难拖
				var translateY = disY+eleY;
				//console.log(translateY)
				if(translateY > 0){
					//比例：逐渐减小 
					var scale = 1 - translateY/document.documentElement.clientHeight;
					//console.log(scale)
					translateY = translateY * scale;
					//console.log(translateY)
					
				}else if(translateY < document.documentElement.clientHeight-navsList.offsetHeight){
					//右边留白   over 正值
					var over = (document.documentElement.clientHeight-navsList.offsetHeight) - translateY;
					//比例：逐渐减小 
					var scale = 1 - over/document.documentElement.clientHeight;
					
					//新的 translateY  = 临界值 + over*scale
					translateY = document.documentElement.clientHeight-navsList.offsetHeight - over*scale;
				};
				//确定元素位置
				transformCss(navsList,'translateY',translateY);
			
				
				//结束位置
				S2 = translateY;
				//结束时间
				T2 = new Date().getTime();
				//距离差
				SValue = S2 - S1;
				//时间差
				TValue = T2 - T1;
				
				//检测callback
				if(callback && callback['move']){
					callback['move']();
				};
			});
			//加速
			navsWrap.addEventListener('touchend',function(){
				//速度      NaN
				var speed = SValue / TValue;  
				
				//console.log(speed)
				
				//加速的路程 = touchmove产生的位移值 + 速度产生的值
				var target = transformCss(navsList,'translateY') +speed*100;
				
				//console.log(target);
				
				
				//橡皮筋回弹
				var type = 'Linear';
				if(target > 0){
					target = 0;
					type = 'easeOut';
				}else if(target < document.documentElement.clientHeight-navsList.offsetHeight){
					target = document.documentElement.clientHeight-navsList.offsetHeight;
					type = 'easeOut';
				};
				
				//位移总时间
				var time = 1;
				moveTween(type,target,time);
				
				
			});
			
			function moveTween(type,target,time){
				//t : 当前次数
				var t = 0;
				//b : 起始位置
				var b = transformCss(navsList,'translateY');				
				//c : 结束位置与起始位置的距离差
				var c = target - b;
				//d : 总次数
				var d = time/0.02;
				
				timer = setInterval(function(){
					t++;
					
					if(t > d){
						//定时器停止
						clearInterval(timer);
						//检测callback
						if(callback && callback['end']){
							callback['end']();
						};
					}else{
						//返回值
						var point = Tween[type](t,b,c,d);
						transformCss(navsList,'translateY',point);
						//检测callback
						if(callback && callback['move']){
							callback['move']();
						};
					};										
					
				},20);
			};
		};
		
	
})(window);

		