//创建主标题
var title = [{name:"首页",en:"index"},{name:"自我介绍",en:"INTRODUCE ME"},{name:"作品展示",en:"PRODUCTION"},{name:"随手练习",en:"EXPERIENCE"},{name:"关于我",en:"ABOUT ME"},{name:"联系我",en:"CONTACT ME"}]


//练习作品目录
var exercise = ["普通响应式联系","设置Div样式","模拟手机发送","生成100个Div","图片切换","生成V字形","模拟QQ菜单","生成相册","相册浏览","指向显示","商品计价","模拟QQ登录","评分","评星","全选","淘宝广告","时钟","日历","查找替换","文字转移","拖动","search、hash","框选","滚动条"]


//top
//点击top右侧标签时
	$('#anchor li a').click(function(){
		num = $('#anchor li a').index(this);
//$('#box').css('top',document.body.clientHeight*(i+1)+'px')
		$('#box')[0].style.top = -$('#box1')[0].offsetHeight*$('#anchor li a').index(this)+'px';
		$('aside a').attr("class", "")
		$('aside a').eq($('#anchor li a').index(this)).attr("class", "asselect")
	})
//点击侧边栏时
	$('aside a').click(function(){
		num = $('aside a').index(this);
		$('aside a').attr("class", "")
		this.className = "asselect";
		$('#box').animate({
			top: -$('#box1')[0].offsetHeight*$('aside a').index(this)
		},
		600, 
		'linear'
		)
})
			
	
		
		
		/*box3*/
		$('#production li').mouseover(function (event){
			this.className = 'productionborder';
			$('#production li p').eq($('#production li').index(this)).css({
				"display":"block",
				"bottom":"-45px",
				"left":"20px"
			})
		})
		$('#production li').mouseleave(function (){
			this.className = '';
			$('#production li p').eq($('#production li').index(this)).css("display","");
		})
		
		
		/*box4 学习练习*/
		//box4内容
		$('#box4').html("<div class="+"boxhead"+"></div><div id="+"experience"+"></div>");
		//$('#box4 .boxhead').html("<p>随手练习</p><p>· experience ·</p>");
		
		$('#experience').html("<div id="+"experiencehead"+" class="+"clearFix"+"></div><div id="+"experiencebody"+"></div>");
		$("#experiencehead").html(function(){
			var hm = "";
			for(var i=0;i<4;i++){
				hm+= '<div class="level"><img src="img/level'+(i+1)+'.png" alt=""/></div>';
			}
			return hm;
		})
		$("#experiencebody").html(function(){
			var hm = "";
			for(var i=0;i<4;i++){
				hm += '<div class="experiencebody"></div>';
			}
			return hm;
		})
		$("#experiencehead .level")[0].className = 'level active';
		$("#experiencebody div").eq(0).show();
		
		//点击选项卡
		$('.level').click(function(){
		$('.level').removeClass('active').filter(this).addClass('active');
			$('.experiencebody').hide().eq($(this).index()).show();
		});
		
		//创建练习图标
		for(var i=0;i<4;i++){
			$('.experiencebody').eq(i).html("<ul>"+ahref()+"</ul>");
		}
		
		function ahref(){
			var h="";
			for(var j=0;j<6;j++){
				h+= '<li><a href="lianxi/'+(i+1)+"-"+(j+1)+'/index.html" target=_blank></a></li>'
				
			}
			return h;
		}
		var experiencebodycolor=["#4da4fc","#91e162","#584dfb","#4dd8fc"]
		for(var i=0;i<$('.experiencebody').length;i++){
			$('.experiencebody').eq(i).children().children().children().css("borderColor",experiencebodycolor[i]);
			$('.experiencebody').eq(i).children().children().children().css("color",experiencebodycolor[i]);
		}
		for(var i=0;i<$('.experiencebody a').length;i++){
			$('.experiencebody a').eq(i)[0].innerHTML = exercise[i];
		}
		$('.experiencebody a').mouseover(function(){
			var hm = this.style.color;
			this.style.color = 'red';
			$('.experiencebody a').mouseleave(function(){
				this.style.color = hm;
			})
		})
		
		
		
		
/*鼠标滚轮*/
var num =0
mScroll(document,function(){
	num--
	if(num<0){
		num=0;
		return;
	}
	$('aside a').attr("class", "")
	$('aside a').eq(num).attr("class", "asselect");
	$('#box').animate({
			top: -$('#box1')[0].offsetHeight*num
		},
		600, 
		'linear'
		)
},function(){
	num++
	if(num>5){
		num=5;
		return;
	}
	$('aside a').attr("class", "")
	$('aside a').eq(num).attr("class", "asselect");
	$('#box').animate({
			top: -$('#box1')[0].offsetHeight*num
		},
		600, 
		'linear'
		)
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

//box 标题内容
$('.boxhead').html("<p></p><p></p>");
for(var i=0;i<5;i++){
	$(".boxhead p:even").eq(i).html(title[i+1].name)
	$(".boxhead p:odd").eq(i).html("· "+title[i+1].en+" ·")
}

		
	