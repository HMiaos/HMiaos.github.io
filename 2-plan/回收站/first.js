/*top*/
	//top 左边 '游戏' 标签
	$('#topleft a').eq(0).on('mouseover',function(){
		$('#rests').show();
	})
	$('#topleft a').eq(0).on('mouseleave',function(){
		$('#rests').hide();
	})
	//Top 右边  '通行证'标签
	
	$('#topright a').eq(1).on('click',function(){
		$('#landing').toggle();
	})
	
			
	
	
	//设置
	$('#topleft a').eq(2).on('click',function(){
		$('#shezhi').toggle();	
	})
	$('#none').on('click',function(){
		$('#shezhi').hide();	
	})
	//登陆界面
	$('#landing a').eq(0).on('click',function(){
		if(onoff){
			$('#topright a').eq(1).html('您的游戏通行证');
			$('#landing a').eq(0).html('登陆');
			$('#landing').hide();
			onoff = false;
			return;
		}
		$('#login').toggle();
	})
	//登陆
	var onoff = false;
	$('#logina a').eq(0).on('click',function(){
		$('#login').hide();
		$('#landing').toggle();
		//验证
		/*验证懒得写了*/
		console.log($('#identp input'))
		if($('#identp input')[0].value !==''){
			$('#topright a').eq(1).html('欢迎您，'+$('#identp input')[0].value);
			$('#landing a').eq(0).html('退出我的账户');
			onoff = true;
		}
	
	})
	//X关闭
	$('#logintop i').eq(0).on('click',function(){
		$('#login').hide();
		$('#landing').hide();
	})
	
	

/*剧情对话*/	
//	$("#dialogue").htmle('<img src="" alt="" />
//			<p></p>')
	
	
	
	
	
	
	
//游戏开始	
game()
function game(){
	
	//飞机 plan
//	var plan = {
//		hp:5,
//		
//	}
	function setplan(name,hp,img,die){
		var obj = {
			'name':name,
			'hp':hp,
			'img':img,
			'die':die
		}
		
		return obj;
	}
	var box = document.getElementById('box');
	var div1 = document.getElementById('plan');
	var obj = {};
	var timer = null;
	var onOff = true;
	var plansudu = 8;
	var zidanoff = false;
	var bullets = [];
	document.onkeydown = function(ev){
		if(ev.keyCode==32&&!zidanoff){
			setbullet();
			zidanoff = true;
		}
	//	console.log(ev.keyCode)
		//把对应的键值设为true
		obj[ev.keyCode] = true;
		//用一个变量防止多次开启定时器
		if(!onOff)return;
		onOff = false;
		play();
	};
	
	document.onkeyup = function(ev){
		if(ev.keyCode==32){
			clearInterval(zidantimer);
			zidanoff = false;
		}
		//如果按键抬起，把对应的键值设为false。
		obj[ev.keyCode] = false;
		//如果有一个键值是true，说明有按键按下，不能清除定时器，否则就清除定时器。 
		for(var i=37;i<=40;i++){
			if(obj[i]){
				return;
			}
		}
		clearInterval(timer);
		onOff = true;
	};
	
	function play(){
		//空格是32
		timer = setInterval(function(){
			if(obj['37']){
				div1.style.left = div1.offsetLeft - plansudu+'px';
				if(div1.offsetLeft<0){
					div1.style.left = 0;
				}
			}
			if(obj['38']){
				div1.style.top = div1.offsetTop - plansudu+'px';
				if(div1.offsetTop<0){
					div1.style.top = 0;
				}
			}
			if(obj['39']){
				div1.style.left = div1.offsetLeft + plansudu+'px';
				if(div1.offsetLeft>box.clientWidth-div1.clientWidth){
					div1.style.left = box.clientWidth-div1.clientWidth +'px';
				}
			}
			if(obj['40']){
				div1.style.top = div1.offsetTop + plansudu+'px';
				if(div1.offsetTop>box.clientHeight-div1.clientHeight){
					div1.style.top = box.clientHeight-div1.clientHeight +'px';
				}
			}
		}, 30);
	}
				
	function setbullet(){
		
		zidantimer = setInterval(function(){
			var hm = document.createElement('div');
			hm.className = 'zidan';
			hm.style.top = div1.offsetTop-div1.offsetHeight +'px';
			hm.style.left = div1.offsetLeft+div1.offsetWidth/2-5 +'px';
			$('#box')[0].appendChild(hm);
			mTween(hm,'top',-5,500,'linear',function(){
				if(hm.offsetTop<0){
					$('#box')[0].removeChild(hm);
					bullets.shift();
				}
			})
			bullets.push(hm)
		},100)
	}


	/*敌机*/
	var enemytime = 2000;	//敌机出现时间间隔（毫秒）
	var enemysudu = 5000;	//敌机进攻速度
	var enemyoff = false;	//敌机创建开关
	var enemys = [];    	//敌机数量
	function enemytim(a,b){
		enemytimer = setInterval(function(){
			if(enemyoff){
				return;
			}
			var enemyplan = document.createElement('div');
				enemyplan.className = a;
				enemyplan.style.top = 0;
				enemyplan.style.left = Math.random()*910+'px';
				$('#box')[0].appendChild(enemyplan);
				enemys.push(enemyplan)
				mTween(enemyplan,'top',602,enemysudu,'linear',function(){
					if(enemyplan.offsetTop>600){//如果敌机移动到游戏内容界面之外，则删除
						$('#box')[0].removeChild(enemyplan);
						enemys.shift();
					}
				})
		},b)
	}
		enemytim("enemy",enemytime)




	
	/*游戏结束调用函数*/

	function gameover(){
		
	}



	//得分/生命值/通关目标
	var point = 0;
	var planlife = 3;
	var firstaim = 100;
	var bossoff = true;
	$("#leftbox p").eq(2).html("本关通关目标：摧毁敌机 <span>"+firstaim+'</span> 架');
//碰撞检测
	pztimer1 = setInterval(function(){
		for(var j=0;j<enemys.length;j++){
			//判断敌机和本机的碰撞
			if(CollisionTest(enemys[j],div1)){
				$('#box')[0].removeChild(enemys[j])
				enemys.splice(j,1)
				planlife--
				$("#leftbox p").eq(0).html("生命值：<span>"+planlife+'</span>');
				if(planlife<1){
					gameover();
				}
			}
		}
		for(var k=0;k<bullets.length;k++){
			for(var j=0;j<enemys.length;j++){
				if(CollisionTest(enemys[j],bullets[k])){
					$('#box')[0].removeChild(enemys[j])
					$('#box')[0].removeChild(bullets[k])
					enemys.splice(j,1)
					bullets.splice(k,1)
					point++
					$("#leftbox p").eq(1).html("目前得分：<span>"+point+'</span>') ;
				}
			}
						if(bossoff){
			if(point>=firstaim){
						clearInterval(enemytimer)
					/*boss 来袭！*/
						enemytime /=2;
							bossoff = false;
							enemytim("enemy2",enemytime)
							var boss = document.createElement('div');
							boss.className = 'boss'
							$('#box')[0].appendChild(boss);
							bosstimer = setInterval(function(){
								if($('#plan')[0].offsetTop<200){
									gameover()
								}
							},30)
						}
			}
		}
	},20)
		
//检测obj1是否碰撞obj2如果是就返回true，否则false
	function CollisionTest(obj1,obj2){
		var pos1 = getPos(obj1);
		var pos2 = getPos(obj2);
		//排除掉所有不能碰撞的结果，剩下的就是碰撞。
		/*if(pos1.bottom<pos2.top||pos1.left>pos2.right||pos1.top>pos2.bottom||pos1.right<pos2.left){
			return false;
		}else{
			return true;
		}*/
		return !(pos1.bottom<pos2.top||pos1.left>pos2.right||pos1.top>pos2.bottom||pos1.right<pos2.left);
	}

	function getPos(obj){
		return obj.getBoundingClientRect();
		//获取 bottom top left right height width
	}
}


//canvas星光背景
	"use strict";
	
	var canvas = document.getElementById('canvas'),
	  ctx = canvas.getContext('2d'),
	  w = canvas.width = window.innerWidth,
	  h = canvas.height = window.innerHeight,
	
	  hue = 217,
	  stars = [],
	  count = 0,
	  maxStars = 1200;
	
	var canvas2 = document.createElement('canvas'),
	  ctx2 = canvas2.getContext('2d');
	canvas2.width = 100;
	canvas2.height = 100;
	var half = canvas2.width / 2,
	  gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
	gradient2.addColorStop(0.025, '#fff');
	gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
	gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
	gradient2.addColorStop(1, 'transparent');
	
	ctx2.fillStyle = gradient2;
	ctx2.beginPath();
	ctx2.arc(half, half, half, 0, Math.PI * 2);
	ctx2.fill();
	
	// End cache
	
	function random(min, max) {
	  if (arguments.length < 2) {
	    max = min;
	    min = 0;
	  }
	
	  if (min > max) {
	    var hold = max;
	    max = min;
	    min = hold;
	  }
	
	  return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	
	function maxOrbit(x, y) {
	  var max = Math.max(x, y),
	    diameter = Math.round(Math.sqrt(max * max + max * max));
	  return diameter / 2;
	}
	
	var Star = function() {
	
	  this.orbitRadius = random(maxOrbit(w, h));
	  this.radius = random(60, this.orbitRadius) / 12;
	  this.orbitX = w / 2;
	  this.orbitY = h / 2;
	  this.timePassed = random(0, maxStars);
	  this.speed = random(this.orbitRadius) / 900000;
	  this.alpha = random(2, 10) / 10;
	
	  count++;
	  stars[count] = this;
	}
	
	Star.prototype.draw = function() {
	  var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
	    y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
	    twinkle = random(10);
	
	  if (twinkle === 1 && this.alpha > 0) {
	    this.alpha -= 0.05;
	  } else if (twinkle === 2 && this.alpha < 1) {
	    this.alpha += 0.05;
	  }
	
	  ctx.globalAlpha = this.alpha;
	  ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
	  this.timePassed += this.speed;
	}
	
	for (var i = 0; i < maxStars; i++) {
	  new Star();
	}
	
	function animation() {
	  ctx.globalCompositeOperation = 'source-over';
	  ctx.globalAlpha = 0.8;
	  ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 1)';
	  ctx.fillRect(0, 0, w, h)
	
	  ctx.globalCompositeOperation = 'lighter';
	  for (var i = 1, l = stars.length; i < l; i++) {
	    stars[i].draw();
	  };
	
	  window.requestAnimationFrame(animation);
	}
	
	animation();