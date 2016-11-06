/**
 * 加载详情页面
 */

function loadDetailContent(prosID,data,goodsID){
	$("#footer").show();
	$("#content").html("");
	$("#header").load("detail.html #detailHeader", function() {
		detailHearder(prosID,data,goodsID);
	});
	$("#content").load("detail.html #detailContent", function() {
		detailConent(prosID,data,goodsID);
	});
	$("#footer").load("detail.html #detailFooter", function() {
		/**
		 * 跳转至购物车页面
		 */
		$("#gocartgory").on("click",function(){
//			loadDetailContent(prosID,data,goodsID)
			loadGoodsCarContent("proList",goodsID,data,prosID);
		});
		/**
		 * localstroage存取购物车数据
		 */
		$("#addCart").on("click",function(){
			Toast("商品:"+prosID+"已加入购物车 ",1500);
			var flag = 0;
			var _a = prosID.substr(0,2);
			var _b = prosID.substr(0,4);
			var _c = prosID.substr(0,6);
			var cartInf = JSON.parse(localStorage.getItem("cartInf"));
			var _goodsNum = $("#goods-number").val();
			var _goodsPrice = data[_a]["children"][_b]["children"][_c]["children"][prosID]["price"];
			var _goodsPicture = data[_a]["children"][_b]["children"][_c]["children"][prosID]["listpic"];
			if(cartInf == null){
				var _val=[{proID:prosID,proNum:_goodsNum,proPrice:_goodsPrice,peoPicture:_goodsPicture}];
				_val = JSON.stringify(_val)
				localStorage.setItem("cartInf",_val);
            }else{
            	for(var key in cartInf){
            		if(cartInf[key]["proID"] == prosID){
            			var oddNum = cartInf[key]["proNum"];
            			var newNum = Number(oddNum)+Number(_goodsNum);
            			cartInf[key]["proNum"] = newNum;
            			_val = JSON.stringify(cartInf);
            			flag = 1;
            			localStorage.setItem("cartInf",_val);
            			
            		}
            	}
            	if(flag == 0){
            		var _val={proID:prosID,proNum:_goodsNum,proPrice:_goodsPrice,proPicture:_goodsPicture};
	                cartInf.push(_val);
	                _val = JSON.stringify(cartInf)
	                localStorage.setItem("cartInf",_val);
            	}else if(flag == 1){
            		flag = 0;
            	}
            	
            }
		});
	});
}
/**
 * 头部JS代码
 */
function detailHearder(prosID,data,goodsID) {
	$("#detailback").on("click",function(){
		var value="value";
		loadproContent(value,goodsID,data);
	})
	$("#proNum").text("编号："+prosID)
}

/**
 * 内容区JS代码
 */
function detailConent(prosID,data,goodsID) {
	
	var _listsBanner = '';
	var _listsItem = '';
	var _a=prosID.substr(0,2);
	var _b=prosID.substr(0,4);
	var _c=prosID.substr(0,6);
	var bannerVaule="";
	var item = data[_a]["children"][_b]["children"][_c]["children"][prosID];
	for(var i = 0;i < item.detailpic.length;i++){
		bannerVaule += '<div class="swiper-slide"><img src="'+item.detailpic[i]+'.jpg" /></div>';
	}
	var strBanner = '<div class="swiper-wrapper">'+bannerVaule+'</div><div class="swiper-pagination"></div>';
	_listsBanner += format(strBanner,item);
    $("#swiper-container").html(_listsBanner);
    var strItem = '<p>'+item.name+'<i class="icon-angle-right icon-2x"></i></p>'+
    '<p><i>￥</i>'+item.price+'<span>￥'+item.priceago+'</span></p>'
    _listsItem += format(strItem,item);
    $("#goods-name").html(_listsItem);
    
	/**
	 * 详情页Swiper轮播图
	 */
	var mySwiper = new Swiper('.swiper-container', {
		loop: true,
		autoplay: 3000,
		autoplayDisableOnInteraction: false,
		// 如果需要分页器
		pagination: '.swiper-pagination',
	})
	
		/**
		 * 详情页数量增加按钮
		 */
	$("#numAdd").on("click", function(e) {
			e.stopPropagation();
			var num = $("#goods-number").val();
			//	alert(typeof num)
			num = num - (-1);
			//	alert(num);
			$("#goods-number").val(num);
			$("#prosNUM").text(num+"个");
		})
		/**
		 * 详情页数量减少按钮
		 */
	$("#numReduce").on("click", function(e) {
		e.stopPropagation();
		var num = Number($("#goods-number").val());
		if(num == 1) {
			num = 1;
		} else {
			num = num - 1;
		}
		$("#goods-number").val(num);
		$("#prosNUM").text(num+"个");
	});
	$("#goods-number").on("change",function(e){
		e.stopPropagation();
		var num = $(this).val();
		$("#prosNUM").text(num+"个");
	})
	/**
	 * format(html,data);
	 * html:要处理的字符串；
	 * data：要处理的对象；
	 */
	function format(html, data) {
		return html.replace(/{{([\w]+)}}/g, function(name, key) {
			return data[key] || "";
		});
	}
	var myScroll;
	var pullUpFlag = 0;//不进行上拉加载，如果值为1，则表示可以上拉加载
	var $pullUp = $("#pullUp");
	function loaded(){
		alert(1)
         myScroll = new IScroll("#detailContent",{
			/*需要使用iscroll-probe.js才能生效
			 * probeType：1  滚动不繁忙的时候触发
			probeType：2  滚动时每隔一定时间触发
			probeType：3  每滚动一像素触发一次*/
			probeType: 3,
			momentum: false,//关闭惯性滑动
			mouseWheel: false, //鼠标滑轮开启
			scrollbars: true, //滚动条可见
			fadeScrollbars: true, //滚动条渐隐
			interactiveScrollbars: true, //滚动条可拖动
			shrinkScrollbars: 'scale', // 当滚动边界之外的滚动条是由少量的收缩
			useTransform: true, //CSS转化
			useTransition: true, //CSS过渡//iphone下面打开，解决闪屏问题
			bounce: true, //反弹,否则不能进行上下滚动
			freeScroll: false, //只能在一个方向上滑动
			startX: 0,
			startY: 0,//开始时显示的位置
			
		});
		myScroll.on("scroll",positionJudged);
		myScroll.on("scrollEnd",action);
	    
		
	}
	loaded();
	$(window).scrollTop = 0;
	function positionJudged(){
		this.hasVerticalScroll = true;
		this.maxScrollY = -560;
		if(this.y < this.maxScrollY - 40){
			$pullUp.html("松开进入商品图文详情");
			pullUpFlag = 1;
		}
	}
	function action(){
		if(pullUpFlag == 1){
			pullUpAction();
			pullUpFlag = 0;
		}
		
	}
	function pullUpAction(){
		$pullUp.html("上拉查看商品图文详情");
		loadDetailsContent(prosID,data,goodsID);
		
	}
	
}

/**
 * 加载详情2页面
 */

function loadDetailsContent(prosID,data,goodsID){
	
	$("#header").load("xq.html #detail_Header", function() {
		detailsHeader(prosID,data,goodsID);
	});
	$("#content").load("xq.html #detail_Section", function() {
		detailsContent(prosID,data,goodsID)
		$("#footer").hide();
	});
}

function detailsHeader(prosID,data,goodsID){
	$("#detail_Header_back").on("click",function(){
		loadDetailContent(prosID,data,goodsID)
	})
}
function detailsContent(prosID,data,goodsID){
	$("#detail-rule").on("click",function(){
		$(".detail-rule").removeClass("hideGoods").addClass("showGoods");
		$(".detail-intro").removeClass("showGoods").addClass("hideGoods");
		$(this).css({
			"border-bottom":"1px solid #26c269",
			"color":"#26c269"
		})
		$("#detail-intro").css({
			"border-bottom":"none",
			"color":"#000"
		})
	})
	$("#detail-intro").on("click",function(){
		$(".detail-rule").removeClass("showGoods").addClass("hideGoods");
		$(".detail-intro").removeClass("hideGoods").addClass("showGoods");
		$(this).css({
			"border-bottom":"1px solid #26c269",
			"color":"#26c269"
		})
		$("#detail-rule").css({
			"border-bottom":"none",
			"color":"#000"
		})
	})
}
/**
 * 这是一个模仿原生的Toast的功能，属于自动消失的提示框
 * @param {String} str
 * @param {Number} time
 */
function Toast(str,time){
	$("#toast").html(str);
	$("#toast").addClass("fadeIn");
	setTimeout(function(){
		$("#toast").removeClass("fadeIn").addClass("fadeOut");
		$("#toast").on("webkitAnimationEnd",function(){
			$(this).html("");
			$(this).removeClass("fadeOut");
			$(this).off("webkitAnimationEnd");
		})
	},time)
}
