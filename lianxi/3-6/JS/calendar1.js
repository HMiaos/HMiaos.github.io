/**
 * Created by JSONLY on 2016/7/3.
 */

(function(window){
 	//初始化
 	var time,
 		date,
 		upper,
 		everyDay,
 		prevMonth,
 		nextMonth,
 		weekText = ['日','一','二','三','四','五','六'],
		now = 0,
		len = 42,
		toDay = (new Date()).getDate();
	function init(timeEle,dateEle,upperEle,everyDayEle,prevMonthEle,nextMonthEle){
		time = timeEle;
 		date = dateEle;
 		upper = upperEle;
 		everyDay = everyDayEle;
 		prevMonth = prevMonthEle;
 		nextMonth = nextMonthEle;
		showTime();
		autoPlay();
		showDate(now,len);
		changeMonth(now);
	}
		
	//自动切换时间
	function autoPlay(){
		setInterval(function(){
			showTime();
		}, 1000)
	}
	//显示时间
	function showTime(){
		var d = new Date();
		var year = d.getFullYear();
		var month = d.getMonth()+1;
		var day = d.getDate();
		var hours = d.getHours();
		var minutes = d.getMinutes();
		var seconds = d.getSeconds();
		var week = d.getDay();
		//时间显示到页面上
		time.innerHTML = toTwo(hours)+':'+toTwo(minutes)+':'+toTwo(seconds);
		date.innerHTML = year+'年'+month+'月'+day+'日,星期'+weekText[week];
	}
	//显示每一天
	function showDate(now,len){
		var d = new Date();
		//设置日期
		d.setMonth(d.getMonth()+now);

		var year = d.getFullYear();
		var month = d.getMonth()+1;
		
		//填充upper的内容
		upper.innerHTML = year+'年'+month+'月';
		//判断这个月的第一天从那个位置开始显示，根据星期来算。
		//如果week是0说明是周日，那么就周日开始显示本月时间，
		d.setDate(1);
		var week = d.getDay();
		if(week == 0){
			week = 7;
		}
		week--;
		//上一个月的天数
		d.setDate(0);
		var prevDaysNum = d.getDate();

		//计算上个月从那一天开始显示；
		var prevMonthStartDays = prevDaysNum - week + 1;
		var createEveryDays = '';
		//创建上一个月的元素
		for(var i=prevMonthStartDays;i<=prevDaysNum;i++){
			
			createEveryDays += '<a href="javascript:;" class="old">'+i+'</a>';
		}
		
		

		//当前月多少天
		d.setMonth(d.getMonth()+now+2);
		d.setDate(0);
		var nowDaysNum = d.getDate(); 
		//创建当前月的元素
		for(var i=1;i<=nowDaysNum;i++){

			if(now==0&&toDay == i){
				createEveryDays += '<a href="javascript:;" class="active">'+i+'</a>';	
			}else{
				createEveryDays += '<a href="javascript:;">'+i+'</a>';
			}
		}
		//剩余格子
		len -= week+nowDaysNum;
		//计算下个月
		for(var i=1;i<=len;i++){
			if(now == -1&&i == toDay){
				createEveryDays += '<a href="javascript:;" class="old active">'+i+'</a>';
			}else{
				createEveryDays += '<a href="javascript:;" class="old">'+i+'</a>';
			}
		}

		//把字符串放入页面生成元素
		everyDay.innerHTML = createEveryDays;
		
	}
	function changeMonth(i){

		prevMonth.onclick = function(){
			i--;
			showDate(i,len);
		};
		nextMonth.onclick = function(){
			i++;
			showDate(i,len);
		};
	}
	//补零
	function toTwo(n){
		return n<10? '0'+n:''+n;
	}

	//对外提供方法
	window.init = init;
})(window);