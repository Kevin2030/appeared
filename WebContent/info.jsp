<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta content="yes" name="apple-mobile-web-app-capable">
<meta content="black" name="apple-mobile-web-app-status-bar-style">
<meta content="yes" name="apple-touch-fullscreen">
<meta content="telephone=no" name="format-detection">
<meta name="format-detection" content="telephone=no,email=no">
<meta name="viewport" content="width=device-width, target-densitydpi=160dpi, initial-scale=1.0, maximum-scale=1, user-scalable=no, minimal-ui">
<title>最美身材</title>
<link href="css/info.css" rel="stylesheet" type="text/css">
</head>
<body>
	<div id="container">
		<img style="display:block;width:100%;" src="img/headerTX.jpg">
		<section id="content">
			<p class="title">寻找新年最美身材</p>
<p class="text-bit">新的一年又到了，小美现在在寻找2015年最美的好身材，究竟会是谁呢？自己快来展示自己，让大家都知道你是美不美新年的最美身材吧！正好又遇到情人节，正好可以晒一晒自己在情人节的好身材哦！</p>
<p class="text-bit">活动要求： </p>
<p class="text-bit">身穿符合情人节和春节喜庆的服饰，进行拍摄，秀出好身材，选用红红的衣服、服饰，更容易受到小美的亲睐哦，过年嘛就是要喜庆点！！！</p>
<p class="text-bit">活动日期：</p>
<p class="text-bit">2月11日~2月26日。</p> 
<p class="text-bit">奖励机制：</p>
<p class="text-bit">1.排行榜前5名，能获得美不美准备的礼物。</p> 
<p class="text-wor">2.在活动中，必须每日发布自己的最新身材照，才能有资格获得礼物。</p>
<p class="text-bit">奖品：</p>
<p class="text-bit">第一名：1000元京东购物卡一张。</p>
<p class="text-bit">第二名：卡西欧SHN5010-4L女士腕表</p> 
<p class="text-bit">第三名：apple ipod shuffle一个</p>
<p class="text-bit">第四名：金稻蒸脸机一台 </p>
<p class="text-bit">第五名：价值159附带蓝牙拍摄功能自拍神杆</p>
<a href="javascript:chat();">安卓私聊</a>
<a href="javascript:queryUserInfo();">安卓查看个人资料</a>
<a href="javascript:chat1();">IOS私聊</a>
<a href="javascript:queryUserInfo1();">IOS查看个人资料</a>

		</section>
	</div>
	<script>
	function chat() {
		android.chat(1111661, 2);
	}
	function queryUserInfo() {
		android.queryUserInfo(1111661);
	}
	function chat1() {
		window.location.href = "http://127.1.1.1/main?method=chat&userID=1111661&sex=2";
	}
	function queryUserInfo1() {
		window.location.href = "http://127.1.1.1/main?method=queryUserInfo&userID=1111661";
	}
	</script>
</body>
</html>