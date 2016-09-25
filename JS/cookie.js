function setCookie(key,value,date){
	var d = new Date();
	//设置过去时间
	d.setDate(d.getDate()+date);
	//设置cookie
	document.cookie = key+'='+value+';expires='+d.toUTCString();
}
function getCookie(key){
	//获取cookie，先分割每一个key,value
	var cookies = document.cookie.split(';');
	//然后对比key，找到后返回value值。
	for(var i=0;i<cookies.length;i++){
		var keys = cookies[i].split('=');
		//console.log(keys)
		if(keys[0].trim() === key.trim()){
			return keys[1];
		}
	}
}
function removeCookie(key){
	//给对应的key值设置过期时间。
	setCookie(key,'',-1);
}