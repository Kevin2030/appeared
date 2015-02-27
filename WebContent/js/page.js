var imgPath= "./css/imgs/";
var isVideoPlay = false;
var $scrolltips = $('.scrolltips');
//判断手机横竖屏状态： 
function checkDirect(){
	if((window.orientation==90 || window.orientation==-90) && !isVideoPlay){  
		 alert('为了更好的效果，请将手机竖起来');
	}  
}
var ready = false;
function gid(o){return document.getElementById(o);}
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", checkDirect, false);

//动态生成JS或CSS;
function delay_js(url){var type=url.split("."),file=type[type.length-1];if(file=="css"){var obj=document.createElement("link"),lnk="href",tp="text/css";obj.setAttribute("rel","stylesheet");}else var obj=document.createElement("script"),lnk="src",tp="text/javascript";obj.setAttribute(lnk,url);obj.setAttribute("type",tp);file=="css"?document.getElementsByTagName("head")[0].appendChild(obj):document.body.appendChild(obj);return obj;};

//延时加载并判断是否加载完毕
function loadjs(url,succ,v){var elem=delay_js(url);if((navigator.userAgent.indexOf('MSIE')==-1)?false:true){elem.onreadystatechange=function(){if(this.readyState&&this.readyState=="loading") return;else succ(v);};}else elem.onload=function(){succ(v);};elem.onerror=function(){};};

var loadImage = function(path, callback){
	var img = new Image();
	img.onload = function(){
		img.onload = null;
		callback && callback(path);
	}
	img.src = path;
}
function removeElement(_element){
	 var _parentElement = _element.parentNode;
	 if(_parentElement){
			_parentElement.removeChild(_element);  
	 }
}

var bgIcon = $('.bg-icon');
var BG = {
	status : 0,
	play : function(){
		gid('bgsound').play();
		BG.status = 1;
		bgIcon.addClass('on');
	},
	stop : function(){
		gid('bgsound').pause();
		BG.status = 0;
		bgIcon.removeClass('on');
	}
};

var opened = false;
function open_door(){
	if(opened){
		return;
	}
	opened = true;
	$('.door1').addClass('playing');
	$('.door2').addClass('playing');	
	setTimeout(function(){
		gid('sound').play();
		$('.tg').hide();
	}, 200);    
	setTimeout(function(){
		playAnimate(0);
		removeElement(gid('sound'));
		$scrolltips.show();
		$('.bg-icon').show();
		BG.play();
	}, 1000);
}

$('.door1').on('swipeUp', function(){
	open_door();
});
$('.door2').on('swipeDown', function(){
	//open_door();
});
var t2,t3;
$('.tg').on('touchstart', function(){
	$('.tg').addClass('on');
	clearTimeout(t2);
	clearTimeout(t3);
	t3 = setTimeout(function(){
		$('.orb').show();
	}, 2200);
	t2 = setTimeout(open_door, 2500);
}).on('touchend', function(){
	clearTimeout(t2);
	clearTimeout(t3);
	$('.orb').hide();
	$('.tg').removeClass('on');
});
document.documentElement.addEventListener('touchmove', function(e){e.preventDefault();});

var loadingPage = (function(){    
	var sourceArr = ['bg_01.jpg', 
					 'shijie.png',
					 'pao_zazhi.png',
					 'pao_xinmeiti.png',
					 'pao_huodong.png',
					 'pao_zhuankan.png',
					 'pao_small1.png',
					 'pao_small2.png',
					 'pao_small3.png',
					 'pao_small4.png',
					 'pao_small5.png',
					 'pao_small6.png',
					 'pao_small7.png',
					 'pao_small8.png',
					 'bg_02.jpg',
					 'bg_03.jpg',
		];
	for (var i = 0; i < sourceArr.length; i++) {
		sourceArr[i] = (imgPath + sourceArr[i]);
	};
	var imgLoader = function(imgs, callback){
		var len = imgs.length, i = 0;
		while(imgs.length){
			loadImage(imgs.shift(), function(path){
				callback(path, ++i, len);
			});
		}
	}
	imgLoader(sourceArr, function(path, curNum, total){
		var percent = curNum/total;
		if(percent == 1){
			setTimeout(gameLoading,500);
		}
	});
})();

var tt = [];
function playAnimate(i){
	$('.sec .img').removeClass('animated');
	tt.forEach(function(t){
		clearTimeout(t);
	});
	var $p = $('#sec-' + (i+1)),
		$img = $p.find('.img');
	$img.each(function(i, el){
		var $el = $(el),
			a = $el.data('animate'),
			d = a && a.split(',');
		var t = setTimeout(function(){
			$el.addClass('animated');
			d && $el.addClass(d[0]);
		}, parseInt(d && d[1] || 0));
		tt.push(t);
	});
}
setTimeout(gameLoading, 5000);

var first = true,
	gameLoaded = false;
function gameLoading(){
	if(gameLoaded){
		return;
	}
	gameLoaded = true;
	var domLoading = document.querySelector('.load');
	removeElement(domLoading);
	gid("main").style.display = "block";
	ready = true;
	// 视差
	var scene = document.getElementById('wraper');
	var parallax = new Parallax(scene);

	var sections = document.querySelectorAll('#main .sec');

	function setPageHeight(){
		for(var i=0;i<sections.length;i++){
			sections[i].style.height = window.innerHeight + 'px';
		}
		gid("section").style.height = window.innerHeight*sections.length+"px";
	}

	var slide = new m.Slide({
		target: sections,
		touchMove: true,
		direction: 'y',
		animTime:300,
		onchange: function(n){
			if(first){
				first = false;
				return;
			}
			playAnimate(n);
			if(n === 4){
				addPicSlider();
			} else if(n === 3){
				setTimeout(numGrow, 800);
			}
			if(n == 9){
				$scrolltips.hide();
			} else {
				$scrolltips.show();
			}
		}
	});
}

var $player = $('.player'),
	$video = $('#video'),
	videoHeight = Math.round($(document).width() * (9/16));
$video.css({'height' : videoHeight, 'marginTop' : videoHeight * -0.5});
var Player = {
	play : function(src){
		$video.attr('src', src);
		setTimeout(function(){
			$player.show();
		});		
		BG.stop();
		isVideoPlay = true;
	},
	stop : function(){
		$player.hide();
		$video.attr('src', 'about:blank');
		BG.play();
		isVideoPlay = false;
	}
}
$video.on('tap', function(e){
	e.stopPropagation();
});
$player.on('tap', function(){
	Player.stop();
});
$('.play-icon').on('click', function(e){
	e.preventDefault();
	Player.play($(this).attr('href'));
});

$('.bg-icon').on('click', function(){
	BG[BG.status === 1 ? 'stop' : 'play']();
});

var S = iSlider;
var imgData = [];
$(['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg',]).each(function(idx, img){
	var src = 'imgs/' + img;
	imgData.push({
		height : 208,
		width : 160,
		content : src
	});
	loadImage(src);
});
function addPicSlider(){	
	var iSlider = new S({
		dom : gid('c-imgs'),
		data : imgData,
		animateType : 'flow',
		isLooping : true,
		isAutoplay : true
	});
}

var $year = $('#year'),
	$percent = $('#percent'),
	$total = $('#total');
function numGrow(){
	var t1,t2,t3;
	clearTimeout(t1);
	clearTimeout(t2);
	clearTimeout(t3);
	$year.text(0);
	$percent.text(0.00);
	$total.text(0);
	function f1(){
		var nowYear = parseInt($year.text(), 10);
		if(nowYear >= 37){
			clearTimeout(t1);
			return;
		}
		$year.text(Math.min(37, nowYear += 2));		
		t1 = setTimeout(f1, 50);
	}
	function f2(){
		var nowPct = parseFloat($percent.text(), 10);
		if(nowPct >= 77.77){
			clearTimeout(t2);
			return;
		}
		$percent.text(Math.min(77.77, (nowPct += 3.17).toFixed(2)));		
		t2 = setTimeout(f2, 50);
	}
	function f3(){
		var nowTotal = parseInt($total.text(), 10);
		if(nowTotal >= 148){
			clearTimeout(t3);
			return;
		}
		$total.text(Math.min(148, nowTotal += 3));
		t3 = setTimeout(f3, 50);
	}
	f1();
	f2();
	f3();
}

var wxData = {
	title : '《男人装》，真性情男性杂志。',
	url : window.location.href,
	desc : '以「真实、趣味、性感、实用」为办刊理念的中国发行最大的时尚类男性期刊',
	img_url : 'http://nrz.xiaolianjie.com/imgs/logo.png'
}

function onBridgeReady() {
	//转发朋友圈
	WeixinJSBridge.on("menu:share:timeline", function(e) {
		var data = {
			img_url: wxData.img_url,
			img_width: "120",
			img_height: "120",
			link: wxData.url,
			desc: wxData.desc,
			title: wxData.title

		};
		WeixinJSBridge.invoke("shareTimeline", data, function(res) {
		});
	});
	//分享给朋友
	WeixinJSBridge.on('menu:share:appmessage', function(argv) {
		WeixinJSBridge.invoke("sendAppMessage", {
			img_url: wxData.img_url,
			img_width: "120",
			img_height: "120",
			link: wxData.url,
			desc: wxData.desc,
			title: wxData.title
		}, function(res) {
		});
	});
};
//执行
try{
	document.addEventListener('WeixinJSBridgeReady', function() {
		onBridgeReady();
	});
}catch(e){}
