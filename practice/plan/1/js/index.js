//初始化分数
var scores=0;
//战机生命值
var ourlife = 3;
//战机速度
var ourspeed = 500;

//界面块
var box = document.getElementById("content");
//游戏块
var gameDiv = document.getElementById("game");
//开始块
var beginDiv = document.getElementById("begin");
//右上角得分块
var scoreDiv=document.getElementById("score");
//右上角分数块
var scoreLabel=document.getElementById("label");
//暂停块
var suspendDiv=document.getElementById("suspend");
//结束块
var endDiv=document.getElementById("end");
//总计得分块
var planScore=document.getElementById("planscore");

var bodyobj=document.getElementsByTagName("body")[0];


var set;
//点击开始--------------------------------------------------------
function begin(){
    var b =document.getElementById("zhuxuanlv");
    b.play();
    beginDiv.style.display="none";
    gameDiv.style.display="block";
    scoreDiv.style.display="block";
    //创建本方飞机
	var ourplan = new plan();
    ourplan.init({
    	planX: (gameDiv.clientWidth - 100)/2,
    	planY:gameDiv.clientHeight - 100,
      	planhp: ourlife,
      	plansizeX:100,
      	plansizeY:85,
   		planboomimage:"image/blow4.gif",
    	plandietime:660,
    	plansudu:ourspeed,
    	imagesrc:"image/My_plane.png"
    })
    ourplan.imagenode.style.display="block";
    ourplan.imagenode.id = 'ourplan';
    document.onmousedown = function(){
    	zanting();
    	return false;
    }
    document.onmousemove = function(ev){
    	var ev = ev || document.event;
    	ourplan.imagenode.style.top = ev.clientY - box.offsetTop - ourplan.imagenode.offsetHeight/2 +'px';
    	ourplan.imagenode.style.left = ev.clientX - box.offsetLeft - ourplan.imagenode.offsetWidth/2 +'px';
    	//范围
    	if(ourplan.imagenode.offsetTop<0){
    		ourplan.imagenode.style.top = 0 +'px';
    	}
    	if(ourplan.imagenode.offsetTop>box.clientHeight - ourplan.imagenode.clientHeight){
    		ourplan.imagenode.style.top = box.clientHeight - ourplan.imagenode.clientHeight +'px';
    	}
    	if(ourplan.imagenode.offsetLeft<0){
    		ourplan.imagenode.style.left = 0 +'px';
    	}
    	if(ourplan.imagenode.offsetLeft>box.clientWidth - ourplan.imagenode.clientWidth){
    		ourplan.imagenode.style.left = box.clientWidth - ourplan.imagenode.clientWidth +'px';
    	}
    
    }
	
	
	



	set=setInterval(start,20);
	number=0;
}




//游戏开始---------------------------------------------
var enemys=[];
var bullets=[];
var mark=0;
var mark1=0;
var backgroundPositionY=0;


function start(){
    gameDiv.style.backgroundPositionY=backgroundPositionY+"px";
    backgroundPositionY+=0.5;
    if(backgroundPositionY==660){
        backgroundPositionY=0;
    }
    //飞机的产生
	mark++;
    if(mark==20){
        mark1++;
        if(mark1%5==0){
            var enemyplan = new plan();
   			enemyplan.init({
		    	planX: random(25,400),
		    	planY: -100,
		      	planhp: 6,
		      	planscore:5000,
		      	plansizeX:100,
		      	plansizeY:70,
		   		planboomimage:"image/blow4.gif",
		    	plandietime:400,
		    	plansudu:random(1,3),
		    	imagesrc:"image/hit_3.png"
		    });
   			enemys.push(enemyplan);
        }
        if(mark1==20){
            var enemyplan = new plan();
   			enemyplan.init({
		    	planX: random(57,285),
		    	planY: -100,
		      	planhp: 12,
		      	planscore:24000,
		      	plansizeX:152,
		      	plansizeY:115,
		   		planboomimage:"image/blow2.gif",
		    	plandietime:1200,
		    	plansudu:1,
		    	imagesrc:"image/big_1.png"
		    });
            mark1=0;
            enemys.push(enemyplan);
        }
        else{
        	var enemyplan = new plan();
   			enemyplan.init({
		    	planX: random(19,430),
		    	planY: -100,
		      	planhp: 1,
		      	planscore:1000,
		      	plansizeX:60,
		      	plansizeY:43,
		   		planboomimage:"image/blow1.gif",
		    	plandietime:200,
		    	plansudu:random(1,4),
		    	imagesrc:"image/small_5.png"
		    });
            enemys.push(enemyplan);
        }
        mark=0;
    }
    //敌机的运动
	var enemyslen=enemys.length;
	for(var i=0;i<enemyslen;i++){
		if(enemys[i].planisdie!=true){
        	enemys[i].planmove();
		}
        if(enemys[i].imagenode.offsetTop>630){
            gameDiv.removeChild(enemys[i].imagenode);
            enemys.splice(i,1);
            enemyslen--;
        }
        if(enemys[i].planisdie==true){
            enemys[i].plandietimes+=20;
            if(enemys[i].plandietimes==enemys[i].plandietime){
                gameDiv.removeChild(enemys[i].imagenode);
                enemys.splice(i,1);
                enemyslen--;
            }
        }
    }
	//子弹的产生
    if(mark%5==0){
    	var abullet = new this.bullet()
    	abullet.init({bulletX: parseInt(document.getElementById('ourplan').style.left)+41,bulletY: parseInt(document.getElementById('ourplan').style.top)-10,bulletsizeX: 10,bulletsizeY: 15})
		bullets.push(abullet);
        var c =document.getElementById("fire-music");
        c.play();
    }
    //子弹的运动
    var bulletslen=bullets.length;
    for(var i=0;i<bulletslen;i++){
        bullets[i].bulletmove();
        if(bullets[i].bulletimage.offsetTop<0){
            gameDiv.removeChild(bullets[i].bulletimage);
            bullets.splice(i,1);
            bulletslen--;
        }
	}
    

    //碰撞检测
    for(var k=0;k<bulletslen;k++){
        for(var j=0;j<enemyslen;j++){
            if(enemys[j].planisdie==false){
            	//敌机和战机的碰撞
				if(CollisionTest(enemys[j].imagenode,ourplan)){
//                if(enemys[j].imagenode.offsetTop+enemys[j].plansizeY>=ourplan.offsetTop+40&&enemys[j].imagenode.offsetTop<=ourplan.offsetTop-20+ourplan.plansizeY){
                      
                      ourplan.src="image/blow4.gif";
                      endDiv.style.display="block";
                      planscore.innerHTML=scores;
                      document.onmousemove = null;
                      document.onmousedown = null;
                      clearInterval(set);
//					}
				}

				//敌机和子弹的碰撞	
                if(CollisionTest(enemys[j].imagenode,bullets[k].bulletimage)){
                   // if(bullets[k].bulletimage.offsetTop<=enemys[j].imagenode.offsetTop+enemys[j].plansizeY&&bullets[k].bulletimage.offsetTop+bullets[k].bulletsizeY>=enemys[j].imagenode.offsetTop){
                        enemys[j].settings.planhp=enemys[j].settings.planhp-bullets[k].bulletattach;
                        if(enemys[j].settings.planhp==0){
                            scores=scores+enemys[j].settings.planscore;
                            scoreLabel.innerHTML=scores;
                            enemys[j].imagenode.src=enemys[j].settings.planboomimage;
                            enemys[j].planisdie=true;
                            var c =document.getElementById("hit-music");
                            c.play();
                            var retime = enemys[j].settings.plandietime;
                            var rechild = enemys[j].imagenode;
                            setTimeout(function(){
                            	gameDiv.removeChild(rechild);
                            	enemys.splice(j,1);
                            	enemyslen--;
                            },retime)
                        }
                        	gameDiv.removeChild(bullets[k].bulletimage);
                            bullets.splice(k,1);
                            bulletslen--;
                            break;
                    //}
                }
            }
        }
    }
}










//飞机对象的创造函数
function plan(){
	this.imagenode=null;
    this.planisdie=false;
    this.plandietimes=0;
    this.parent=document.getElementById("game");
	this.settings = {//默认参数
		planX: 0,
    	planY: 0,
    	planhp: 0,
    	planscore: 0,
    	plansizeX:0,
    	plansizeY:0,
   		planboomimage:0,
    	plandietime:0,
    	plansudu:0,
    	imagesrc:0
	}
	this.planmove=function(){
	    if(scores<=50000){
	        this.imagenode.style.top=this.imagenode.offsetTop+this.settings.plansudu+"px";
	    }
	    else if(scores>50000&&scores<=100000){
	        this.imagenode.style.top=this.imagenode.offsetTop+this.settings.plansudu+1+"px";
	    }
	    else if(scores>100000&&scores<=150000){
	        this.imagenode.style.top=this.imagenode.offsetTop+this.settings.plansudu+2+"px";
	    }
	    else if(scores>150000&&scores<=200000){
	        this.imagenode.style.top=this.imagenode.offsetTop+this.settings.plansudu+3+"px";
	    }
	    else if(scores>200000&&scores<=300000){
	        this.imagenode.style.top=this.imagenode.offsetTop+this.settings.plansudu+4+"px";
	    }
	    else{
	        this.imagenode.style.top=this.imagenode.offsetTop+this.settings.plansudu+5+"px";
	    }
	}
}
plan.prototype.hm = {};
plan.prototype.init = function(opt){
	extend(this.settings,opt);
	this.imagenode=document.createElement("img");
	this.imagenode.style.left=this.settings.planX+"px";
    this.imagenode.style.top=this.settings.planY+"px";
    this.imagenode.src=this.settings.imagesrc;
    this.parent.appendChild(this.imagenode);
}





//子弹对象的创造函数
function bullet(){
	this.bulletimage=null;
    this.bulletattach=1;
    this.parent=document.getElementById("game");
    this.imagesrc = "image/My_zidan.png";
	this.settings = {//默认参数
		bulletX: 0,
    	bulletY: 0,
    	bulletsizeX: 0,
    	bulletsizeY: 0
	}
	this.bulletmove=function(){
    	this.bulletimage.style.top=this.bulletimage.offsetTop-10+"px";
	}
}
bullet.prototype.init = function(opt){
	extend(this.settings,opt);
	this.bulletimage=document.createElement("img");
    this.bulletimage.style.left= this.settings.bulletX+"px";
    this.bulletimage.style.top= this.settings.bulletY+"px";
    this.bulletimage.src=this.imagesrc;
    this.parent.appendChild(this.bulletimage);
}
















//暂停
var number=0;
var zanting=function(){
    if(number==0){
        suspendDiv.style.display="block";
        if(document.onmousemove = null){
        	document.onmousemove = function(ev){
		    	var ev = ev || document.event;
		    	ourplan.imagenode.style.top = ev.clientY - box.offsetTop - ourplan.imagenode.offsetHeight/2 +'px';
		    	ourplan.imagenode.style.left = ev.clientX - box.offsetLeft - ourplan.imagenode.offsetWidth/2 +'px';
		    	//范围
		    	if(ourplan.imagenode.offsetTop<0){
		    		ourplan.imagenode.style.top = 0 +'px';
		    	}
		    	if(ourplan.imagenode.offsetTop>box.clientHeight - ourplan.imagenode.clientHeight){
		    		ourplan.imagenode.style.top = box.clientHeight - ourplan.imagenode.clientHeight +'px';
		    	}
		    	if(ourplan.imagenode.offsetLeft<0){
		    		ourplan.imagenode.style.left = 0 +'px';
		    	}
		    	if(ourplan.imagenode.offsetLeft>box.clientWidth - ourplan.imagenode.clientWidth){
		    		ourplan.imagenode.style.left = box.clientWidth - ourplan.imagenode.clientWidth +'px';
		    	}
		    
		    }
        }
        else{
           document.onmousemove = null
        }
        clearInterval(set);
        number=1;
    }
    else{
        suspendDiv.style.display="none";
        	document.onmousemove = function(ev){
		    	var ev = ev || document.event;
		    	ourplan.style.top = ev.clientY - box.offsetTop - ourplan.offsetHeight/2 +'px';
		    	ourplan.style.left = ev.clientX - box.offsetLeft - ourplan.offsetWidth/2 +'px';
		    	//范围
		    	if(ourplan.offsetTop<0){
		    		ourplan.style.top = 0 +'px';
		    	}
		    	if(ourplan.offsetTop>box.clientHeight - ourplan.clientHeight){
		    		ourplan.style.top = box.clientHeight - ourplan.clientHeight +'px';
		    	}
		    	if(ourplan.offsetLeft<0){
		    		ourplan.style.left = 0 +'px';
		    	}
		    	if(ourplan.offsetLeft>box.clientWidth - ourplan.clientWidth){
		    		ourplan.style.left = box.clientWidth - ourplan.clientWidth +'px';
		    	}
		    
		    }
        set=setInterval(start,20);
        number=0;
    }
}


//再来一次
function again(){
    location.reload(true);
}
//退出游戏
function ExitGame(){
        if(confirm("你确定退出吗?")){
            window.close();
        }

    }



//产生随机数
function random(min,max){
    return Math.floor(min+Math.random()*(max-min));
}

//obj的拷贝
function extend(obj1,obj2){ 
	for(var attr in obj2){
		obj1[attr] = obj2[attr];
	}
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
