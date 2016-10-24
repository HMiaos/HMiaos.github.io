
var num=0;//璁℃暟锛岀敤鏉ュ垏鎹㈤〉鏁�
var onOff=true;//闃叉澶氭婊戝姩閫犳垚閿欎贡

/*鍒濆鍖栫涓€椤靛搴斿皬鍦嗙偣楂樹寒*/
renderPage();


/*鐐瑰嚮btn鎸夐挳*/
$("#btn").click(function(){
	num=1;
})

/*鍙充晶瀵艰埅鐨勭偣鍑讳簨浠�*/
$('#right-side-bar a').click(function(){
	if(!onOff)return;
	onOff=false;
	num=$(this).index();
	renderPage();
	
});

/*榧犳爣婊氬姩瑙﹀彂鐨勪簨浠�*/
mScroll(document,function(){
	if(!onOff)return;
	onOff=false;
	num--;
	if(num<0){
		num=0;
		onOff=true;
		return;
	}
	renderPage();
	
},function(){
	if(!onOff)return;
	onOff=false;
	num++;
	if(num>3){
		num=0;
	}
	
	renderPage();
});

/*灏佽婊氳疆鍑芥暟锛屽尯鍒粴杞簨浠舵槸firefox杩樻槸chrom*/
function mScroll(obj,upper,down){
	obj.addEventListener('DOMMouseScroll', fn, false);
	obj.onmousewheel  = fn;
	function fn(ev){
		var n;/*璐熸暟浠ｈ〃鍚戜笅锛屾鏁版槸鍚戜笂锛宯灏辨槸杩欎釜鏁板瓧*/
		if(ev.detail){
			n = -ev.detail;//firefox
		}else{
			n = ev.wheelDelta;//ie鍜宑hrome
		}
		//n灏忎簬0鍚戜笅婊氬姩锛屽惁鍒欏悜涓娿€�
		if(n<0){
			down();
		}else{
			upper();
		}
	}
}

/*灏佽鍑芥暟鏀瑰彉椤�,娓叉煋鐩稿簲灏忓渾鐐归潰*/
function renderPage(){
	$("#right-side-bar a").removeClass('on').eq(num).addClass('on');
	$(".page").fadeOut().eq(num).fadeIn(600,function(){
		onOff=true;
	});
}