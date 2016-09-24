/*初始值*/
	var plansudu = 4;   	//战机速度	
	var planlife = 3;		//战机生命值
	var enemytime = 1000;	//敌机出现时间间隔（毫秒）
	var enemysudu = 5000;	//敌机进攻速度
	var bulletsudu = 100;	//子弹速度
	var firstaim = 	6;		//第一关目标分数
	var point = 0;			//初始分
	
	
	
	
	
/*初始状态*/

$("#leftbox p").eq(0).html("生命值： <span style='color:greenyellow''>"+planlife+'</span> ');
$("#leftbox p").eq(2).html("本关通关目标：最少获得 <span style='color:red ;'>"+firstaim+'</span> 分，并且摧毁敌方侦察机');
/*top******************************************************************/

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
	

/*剧情对话******************************************************************/	
	var juqing = ["你好，指挥官。","哦，长官你知不知道老是打扰别人的假期是很不礼貌的。","只是一点小事，我保证！这对你来说可不算什么，你可是王牌！","这种话你已经说了很多遍了，而且，每次都是在我度假的时候。","……………………","好了说吧，趁我心情不错，这次又是什么事？","我们收到了特工seven求救信号，可是当我们的巡洋舰赶到时，发现了很多联盟的巨舰，天知道他们怎么出现在了那里，那可是荒芜区...","所以，那块地盘很有可能处于联盟的势力范围内？我们的战舰很有可能不方便踏入？而且，那片区域距离我现在的位置还很近？","不愧是我们的王牌驾驶员!","……（该死的，就不应该来这里度假。）","具体的信息我会发送给你的飞船，在路上你需要仔细阅读一下。","所以，又是让我去当海盗？","当然了！性能那么优越的战机，如果不拿来当海盗，岂不是浪费？","……","赶快启程吧，你的假期，我会写一份报告双倍补偿给你！","我的假期？你已经欠我七十二天的休假了！","什么？哦，这破机器该换了，信号又时好时坏，只能看到画面却没有声音，Jack！快把信息给她发过去，祝你好运，指挥官！","…………"]
	var juimg = [["img/thefirstpass/juqing1.jpg","fl"],["img/thefirstpass/juqing0.jpg","fr"]]
	$("#dialogue").html("<img class='fl' src="+juimg[0][0]+"/><div>"+juqing[0]+"</div>");
	var juqingnum = 0;
	document.onmousedown = function(){
		juqingnum++;
		if(juqingnum == 18){
			document.onmousedown = "";
			$("#leftbox").show();
			$("#dialogue").hide();
			game();
			return;
		}
		$("#dialogue").html("<img class="+juimg[juqingnum%2][1]+" src="+juimg[juqingnum%2][0]+"/><div>"+juqing[juqingnum]+"</div>");
		return false;
	}


/*游戏开始******************************************************************/	
	//初始化的一些数值
	//获取一些html元素
	var box = document.getElementById('box');
	//键值（防止重复按键创立重复定时器）
	var obj = {};
	var timer = null;
	//定时器开关（防止重复建立定时器）
	var onOff = true;
	//子弹开关
	var bulletoff = false;
	//子弹集合
	var bullets = [];	
	//敌机集合
	var enemys = []; 
	
	//提速开关
	var enemysuduoff = true;
	
	//创建飞机对象的函数
	function setplan(hp,planX,planY,imagesrc,w,h){
		//hp：生命值；planX:初始X坐标；planY：初始Y坐标；imagesrc:地址；w:宽，h:高
		//属性
		this.imagenode=null;
		this.planhp = hp;
		this.planhp2 = hp;
		this.planX = planX;
		this.planY = planY;
		this.w = w;
		this.h = h;
		//行为
			//初始化状态
		this.init = function(){
	        this.imagenode=document.createElement("img");
	        $("#box")[0].appendChild(this.imagenode);
	        this.imagenode.style.left=this.planX+"px";
	        this.imagenode.style.top=this.planY+"px";
	        this.imagenode.style.width=this.w+"px";
	        this.imagenode.style.height=this.h+"px";
	        this.imagenode.src=imagesrc;
   		}
    	this.init();
	}
	//创建子弹对象的函数
	function setbullet(sizeX,sizeY,imagesrc,w,h){
		//初始定位:sizeX,sizeY;图片地址：imagesrc；宽：w;高：h;
		//属性
	    this.imagenode=null;
	    this.harm=1;
	    this.sizeX=sizeX;
	    this.sizeY=sizeY;
	    this.w=w;
	    this.h=h;
	    
	    //行为
	    	//初始化
	    this.init = function(){
	        this.imagenode=document.createElement("img");
	        $("#box")[0].appendChild(this.imagenode);
	        this.imagenode.style.left=this.sizeX+"px";
	        this.imagenode.style.top=this.sizeY+"px";
	        this.imagenode.style.width=this.w+"px";
	        this.imagenode.style.height=this.h+"px";
	        this.imagenode.src=imagesrc;
   		}
    	this.init();
	}

//游戏开始函数
function game(){
	//创建战机
	var plan = new setplan(planlife,470,560,'img/thefirstpass/plan-1.png',85,40);

	//键盘事件（开火，战机移动）
	document.onkeydown = function(ev){
		//创建子弹
		if(ev.keyCode==32&&!bulletoff){
			bullettimer = setInterval(function(){
				var bullet = new setbullet(plan.imagenode.offsetLeft+plan.imagenode.offsetWidth/2-5,plan.imagenode.offsetTop-25,'img/thefirstpass/zidan-1.png',10,25);
				mTween(bullet.imagenode,'top',-5,500,'linear',function(){
					if(bullet.imagenode.offsetTop<0){
						$('#box')[0].removeChild(bullet.imagenode);
						bullets.shift();
					}
				})
			bullets.push(bullet);
			},bulletsudu)
			bulletoff = true;
		}
		//把对应的键值设为true
		obj[ev.keyCode] = true;
		//用一个变量防止多次开启定时器
		if(!onOff)return;
		onOff = false;
		play();
	}
	document.onkeyup = function(ev){
		//子弹
		if(ev.keyCode==32){
			clearInterval(bullettimer);
			bulletoff = false;
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
	
	//方向键盘控制移动函数
	function play(){
		//空格是32
		timer = setInterval(function(){
			if(obj['37']){
				plan.imagenode.style.left = plan.imagenode.offsetLeft - plansudu+'px';
				if(plan.imagenode.offsetLeft<0){
					plan.imagenode.style.left = 0;
				}
			}
			if(obj['38']){
				plan.imagenode.style.top = plan.imagenode.offsetTop - plansudu+'px';
				if(plan.imagenode.offsetTop<0){
					plan.imagenode.style.top = 0;
				}
			}
			if(obj['39']){
				plan.imagenode.style.left = plan.imagenode.offsetLeft + plansudu*2+'px';
				if(plan.imagenode.offsetLeft>box.clientWidth-plan.imagenode.clientWidth){
					plan.imagenode.style.left = box.clientWidth-plan.imagenode.clientWidth +'px';
				}
			}
			if(obj['40']){
				plan.imagenode.style.top = plan.imagenode.offsetTop + plansudu*2+'px';
				if(plan.imagenode.offsetTop>box.clientHeight-plan.imagenode.clientHeight){
					plan.imagenode.style.top = box.clientHeight-plan.imagenode.clientHeight +'px';
				}
			}
		}, 20);
	}
	
	//创建敌机
	enemytimer  = setInterval(function(){
		var enemy = new setplan(1,random(0,910),0,'img/thefirstpass/enemy.png',90,60);
		enemys.push(enemy);
		mTween(enemy.imagenode,'top',602,enemysudu,'linear',function(){
			if(enemy.imagenode.offsetTop>600){//如果敌机移动到游戏内容界面之外，则删除
				$('#box')[0].removeChild(enemy.imagenode);
				enemys.shift();
			}
		})
	},enemytime)
	
	
	//检测碰撞
	pztimer1 = setInterval(function(){
		for(var j=0;j<enemys.length;j++){
			//判断敌机和本机的碰撞
			if(CollisionTest(enemys[j].imagenode,plan.imagenode)){
				$('#box')[0].removeChild(enemys[j].imagenode);
				enemys.splice(j,1);
				planlife--;
				$("#leftbox p").eq(0).html("生命值：<span style='color:greenyellow'>"+planlife+'</span>');
				if(planlife<1){
					gameover();
				}
			}
		}
		//判断敌机和子弹的碰撞
		for(var k=0;k<bullets.length;k++){
			for(var j=0;j<enemys.length;j++){
				if(CollisionTest(enemys[j].imagenode,bullets[k].imagenode)){
					$('#box')[0].removeChild(enemys[j].imagenode);
					$('#box')[0].removeChild(bullets[k].imagenode);
					enemys.splice(j,1);
					bullets.splice(k,1);
					point++;
					if(point>firstaim/2){
						if(enemysuduoff){
							enemysudu = enemysudu*2/3;
							enemytime = enemytime*2/3;
							enemysuduoff = false;
						}
					}
					$("#leftbox p").eq(1).html("目前得分：<span style='color:yellow;'>"+point+'</span>');
					if(point>=firstaim){
						gamewin();
					}
				}
			}
//			if(point>=firstaim*2/3){
//				//清除敌机产生定时器，出现Boss
//				clearInterval(enemytimer)
//				setTimeout(function(){
//					boss();
//				},enemytime*enemys.length)
//			}
		}
	},20)


//	//达到目标值后 出现Boss
//	/*boss 来袭！*/
//	var bossoff = true;
//	function boss(){
//		if(!bossoff){
//			return;
//		}
//		bossoff = false;
//		//boss出现后调用函数
//		var warn = document.createElement("div");
// 		$('body')[0].appendChild(warn);
// 		warn.className = 'warn';
// 		warn.innerHTML = 'Boss来袭!';
//		clearInterval(pztimer1);
//		for(var i =0;i<enemys.length;i++){
//			$('#box')[0].removeChild(enemys[i].imagenode);
//		}
// 		var warnpad = 0;
// 		bosstimer = setInterval(function(){
// 			warnpad++;
// 			warn.style.padding = 5*warnpad +'px';
// 		},100)
// 		setTimeout(function(){
// 			clearInterval(bosstimer);
// 			$('body')[0].removeChild(warn);
// 			var bossplan = new setplan(100,0,-200,'img/thefirstpass/boss.png',1000,200);
// 			$('#box')[0].appendChild(bossplan.imagenode);
// 			bossplan.imagenode.className = 'boss';
// 			var bosstop = -200;
// 			bosstimer = setInterval(function(){
// 				bosstop++;
// 				bossplan.imagenode.style.top = bosstop+'px';
// 				if(bossplan.imagenode.offsetTop>0){
// 					clearInterval(bosstimer);
// 					bossfight();
// 				}
// 			},50)
// 		},1500)
//	}
//		var bombs = [];
//	/*boss战*/
//	function bossfight(){
//		//创建炸弹
//		bombtimer = setInterval(function(){
//			var bomb = new setplan(1,random(0,910),0,'img/thefirstpass/bomb.png',20,40);
//			bombs.push(bomb);
//			mTween(bomb.imagenode,'top',602,enemysudu,'linear',function(){
//				if(bomb.imagenode.offsetTop>600){//如果敌机移动到游戏内容界面之外，则删除
//					$('#box')[0].removeChild(bomb.imagenode);
//					bombs.shift();
//				}
//			})
//		},enemytime*5)
//		
//		
//		//创建Boss战中的几种敌机
//		var bossenemy=0;
//		var enemys2=[];
//		enemytimer  = setInterval(function(){
//			if(bossenemy%6==1){
//				var enemy = new setplan(3,random(0,910),0,'img/thefirstpass/enemy-3.png',160,140);	
//			}else if(bossenemy%6==3){
//				var enemy = new setplan(2,random(0,910),0,'img/thefirstpass/enemy-2.png',90,60);	
//			}else{
//				var enemy = new setplan(1,random(0,910),0,'img/thefirstpass/enemy-1.png',30,60);	
//			}
//			enemys.push(enemy);
//			mTween(enemy.imagenode,'top',602,enemysudu,'linear',function(){
//				if(enemy.imagenode.offsetTop>600){//如果敌机移动到游戏内容界面之外，则删除
//					$('#box')[0].removeChild(enemy.imagenode);
//					enemys.shift();
//				}
//			})
//			bossenemy++;
//		},enemytime)
//		
//		//创建Boss攻击方式（闪电）
//		lightningtimer = setInterval(function(){
//			
//		},5*enemytime)
		
		
		//检测碰撞
//		pztimer2 = setInterval(function(){
//			for(var j=0;j<bombs.length;j++){
//				//判断炸弹和本机的碰撞
//				if(CollisionTest(bombs[j].imagenode,plan.imagenode)){
//					$('#box')[0].removeChild(bombs[j].imagenode);
//					bombs.splice(j,1);
//					planlife--;
//					$("#leftbox p").eq(0).html("生命值：<span style='color:greenyellow'>"+planlife+'</span>');
//					if(planlife<1){
//						gameover();
//					}
//				}
//				//判断炸弹和子弹的碰撞
//				for(var k=0;k<bullets.length;k++){
//					if(CollisionTest(bombs[j].imagenode,bullets[k].imagenode)){	
//						$('#box')[0].removeChild(bullets[k].imagenode);
//						$('#box')[0].removeChild(bombs[j].imagenode);
//						bullets.splice(k,1);
//						bombs.splice(j,1);
//					}
//				}
//			}
//			for(var j=0;j<enemys.length;j++){
//				//判断敌机和本机的碰撞
//				if(CollisionTest(enemys[j].imagenode,plan.imagenode)){
//					$('#box')[0].removeChild(enemys[j].imagenode);
//					enemys.splice(j,1);
//					planlife--;
//					$("#leftbox p").eq(0).html("生命值：<span style='color:greenyellow'>"+planlife+'</span>');
//					if(planlife<1){
//						gameover();
//					}
//				}
//			}
//			//判断敌机和子弹的碰撞
//			for(var j=0;j<enemys.length;j++){
//				for(var k=0;k<bullets.length;k++){
//					if(CollisionTest(enemys[j].imagenode,bullets[k].imagenode)){
//						$('#box')[0].removeChild(bullets[k].imagenode);
//						bullets.splice(k,1);
//						//HP-子弹杀伤力
//						enemys[j].planhp--;
//						if(enemys[j].planhp == 0){
//							point += enemys[j].planhp2;
//							$('#box')[0].removeChild(enemys[j].imagenode);
//							enemys.splice(j,1);
//							$("#leftbox p").eq(1).html("目前得分：<span style='color:yellow;'>"+point+'</span>');
//						}
//					}
//				}
//				if(point>/*firstaim*/20){
//					//清除敌机产生定时器，出现Boss
//					clearInterval(enemytimer)
//					setTimeout(function(){
//						boss();
//					},enemytime*enemys.length)
//				}
//			}
//		},30)	
}
	


















/*常用函数*/
	//产生min到max之间的随机数
	function random(min,max){
	    return Math.floor(min+Math.random()*(max-min));
	}
	//检测obj1是否碰撞obj2如果是就返回true，否则false
	function CollisionTest(obj1,obj2){
		if(!obj1||!obj2){
			return;
		}
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
	//获取属性
	function getPos(obj){
		return obj.getBoundingClientRect();
		//获取 bottom top left right height width
	}
	/*游戏结束调用函数*/
	function gameover(){
		$("#gameover").show();
		$("#box").hide();
		$("#gameover a").eq(0).click(function(){
			window.location.reload();
		})
		
	}

	//游戏成功
	function gamewin(){
		$("#gameover").show();
		$("#box").hide();
		$("#gameover p").text('任务目标达成！')
		$("#gameover li").eq(0).html('<a href="thesecondpass.html">进入下一关</a>')
		
	}





/*星光背景***************************************************/
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







