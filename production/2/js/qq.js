//初始化


var onOff = false;
$('#page').height(function(){
	return $(window).height();
});
$('#con_body').width(function(){
		return $(window).width();
	});
//当窗口改变
$(window).on('resize',function(){
	$('#page').height(function(){
			return $(window).height();
	});
	$('#con_body').width(function(){
		return $(window).width();
	});
});

//鼠标滚轮事件
mScroll(document,function(){
	if(onOff){
		return;
	}
	onOff = true;
	num--;
	if(num<0){
		num=3;
	}
	setTimeout(function(){
		contentch();
		$('aside li').removeClass('aside_acitve');
		$('aside li').eq(num).addClass('aside_acitve');
		onOff = false;
	},600);
},function(){
	if(onOff){
		return;
	}
	onOff = true;
	num++;
	if(num>3){
		num=0;
	}
	setTimeout(function(){
		contentch();
		$('aside li').removeClass('aside_acitve');
		$('aside li').eq(num).addClass('aside_acitve');
		onOff = false;
	},600);	
})
	
	
	
	
function mScroll(obj,upper,down){
	obj.addEventListener('DOMMouseScroll', fn, false);
	obj.onmousewheel  = fn;

	function fn(ev){
		var n;
		/*
			负数代表向下
			正数是向上
			n就是这个数字
		*/
		if(ev.detail){
			//firefox
			n = -ev.detail;
		}else{
			//ie和chrome
			n = ev.wheelDelta;
		}
		//n小于0向下滚动，否则向上。
		if(n<0){
			down();
		}else{
			upper();
		}
	}
}
	
function contentch(){
	/*HEADER*/
	if(num == 0){
		$('header').html('<ul class="clearFix"><li class="fl"><h1></h1></li><li class="fr headeran1"><a href="javascript:;"><img src="img/heada2.png"/></a></li><li class="fr headeran2"><a href="javascript:;"><img src="img/heada1.png"/></a></li></ul><span>9月12日更新9.5正式版</span>');
	}else{
		$('header').html('<ul class="clearFix"><li class="fl header2"><a href="javascript:;"><img src="img/logo2.png" alt="" /></a></li><li class="fl header2"><a href="javascript:;"><img src="img/heada2.png" alt="" /></a></li></ul>');
	}
	/*CONTENT*/
	if(num == 0){
		$('#con_body').attr('class','con_body1');
		$('#con_body').html('<div class="con1"><img src="img/con1-1.png"/></div><div class="con1"><img src="img/skin.gif" alt="" /></div>');
	}else
	if(num == 1){
		$('#con_body').attr('class','con_body2');
		$('#con_body').html('<div class="conpage2show"><div class="p2show"><img src="img/conpage2-1.png"/></div><div class="p2show"><img src="img/conpage2-2.png"/></div><div class="p2show"><img src="img/conpage2-3.png"/></div></div><div class="conpage2fly"><div><img src="img/conpage2fly-1.png" alt="" /></div><div><img src="img/conpage2fly-2.png" alt="" /></div><div><img src="img/conpage2fly-3.png" alt="" /></div><div><img src="img/conpage2fly-4.png" alt="" /></div></div>')
	}else
	if(num == 2){
		$('#con_body').attr('class','con_body1');
		$('#con_body').html('<div class="conpage3show"><div><img src="img/p3blue.png"></div><div><img src="img/p3blue2.png"></div><div class="clearFix"><img src="img/p3i1.png" class="fl"><img src="img/p3i2.png" class="fl"><img src="img/p3i3.png" class="fl"></div><div><img src="img/p3text.png"></div><p>清爽舒展的界面，鲜艳明快的色彩和干净利落的动效，让浏览畅快愉悦</p></div>')
	}else
	if(num == 3){
		$('#con_body').attr('class','con_body1');
		$('#con_body').html('<div class="conpage4show"><div class="p4img1"><img src="img/p4-1.png" alt="" /></div><div class="p4img2"><img src="img/p4-2.png" alt="" /></div><div class="p4img3"><img src="img/p4-3.png" alt="" /></div><div class="p4img4"><img src="img/p4-4.png" alt="" /></div><div class="p4text"><img src="img/p4text.png"/></div><p>内置微信聊天等应用，兼容Chrome扩展体系，应用中心为您提供海量扩展</p></div>')
	}
}


