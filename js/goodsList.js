/**
 * loadGoodslistContent();
 * 进入商品列表界面。
 */
function loadGoodslistContent(){
	$("#footer").load("home.html #homeFooter",function(){
		$("#footer").show();
		$("#footer").find("ul").find("li").eq(0).on("click",function(){
			loadHome();//绑定主页按钮事件
		});
		$("#footer").find("ul").find("li").eq(1).on("click",function(){
			loadGoodslistContent();//绑定列表页按钮事件
		});
		$("#footer").find("ul").find("li").eq(3).on("click",function(){
			loadGoodsCarContent("goodslist");//绑定购物车页按钮事件
		});
		$("#footer").find("ul").find("li").eq(4).on("click",function(){
			var login = sessionStorage.getItem("isLogin") || null;
			if(login == "true"){
				uesrCreat();//绑定个人中心页按钮事件
			}else{
				loginCreat();//绑定登录注册页按钮事件
			}
		});
	});
	$("#header").load("goodsList.html #goodsListHeader", function() {
		$("#goodsSearch").on("click",function(){
			loadgoodsSearchContent("goodslist");
		})
	});
	$("#content").load("goodsList.html #goodsListContent", function() {
		loadgoodsList();
	});
}
/**
 * loadgoodsSearchContent(type);
 * 进入搜索商品界面，调用时需要传递从哪个界面跳入的参数。
 */
function loadgoodsSearchContent(type,goodsID,data){
	$("#footer").show();
	$("#footer").load("home.html #homeFooter",function(){
		$("#footer").show();
		$("#footer").find("ul").find("li").eq(0).on("click",function(){
			loadHome();//绑定主页按钮事件
		});
		$("#footer").find("ul").find("li").eq(1).on("click",function(){
			loadGoodslistContent();//绑定列表页按钮事件
		});
		$("#footer").find("ul").find("li").eq(3).on("click",function(){
			loadGoodsCarContent("goodslist");//绑定购物车页按钮事件
		});
		$("#footer").find("ul").find("li").eq(4).on("click",function(){
			loginCreat();//绑定登录注册页按钮事件
		});
	});
	$("#header").load("goodsSearch.html #goodsSearchHeader", function() {
		$("#goodsSearchHeader").find("span").on("click",function(){
			if(type == "goodslist"){
				loadGoodslistContent();
			}else if(type =="proList"){
				loadproContent(type,goodsID,data);
			}else if(type =="home"){
				loadHome();
			}
		});
	});
	$("#content").load("goodsSearch.html #goodsSearchContent", function() {
		$("#goodsSearchContent").css("height",$(window).height());
		$(".searchBar").on("click",function(){
			var _value = $(this).text();
			$("#goodsSearch").val(_value)
		})
	});
}
/**
 * checkgoodsList();
 * 加载商品二级列表
 */
function checkgoodsList(data,liNum){
	var _lists="";
	var screenHeight=0;
	$("#goodsListContent").find("ul").find("li").on("click",function(){
		$(this).addClass("goodsListActive").siblings().removeClass("goodsListActive");
		$("#goodsListContent").find("ul").find("li").find("span").css("display","none");
		$(this).children().css("display","block");
		_lists="";
		var id = $(this).data("id");
		var secondaryImg = data[id]["pic"];
		if(secondaryImg == undefined){
			_lists="";
		}else{
			_lists += '<div class="secondaryImg"><img src="'+secondaryImg+'"/></div>';
		}
		for(var key in data[id]["children"]){
			var item = data[id]["children"][key];
			var str = '<div class="secondaryTitle" data-id='+key+'>'+
				'<span>{{name}}</span>'+
				'<i class="icon-angle-right"></i></div>';
			_lists += format(str,item);
			_lists += "<div class='secondaryContent'>"
        	for(var k in data[id]["children"][key]["children"]){
        		var goodsLength=Object.keys(data[id]["children"][key]["children"]).length;
        		//alert(goodsLength)
        		var item = data[id]["children"][key]["children"][k];
				var str = '<div class="goodsContents" data-id='+k+'>'+
				'<img src="{{url}}"/>'+
				'<span>{{name}}</span></div>';
				_lists+= format(str,item);
        	}
        	_lists += "</div>";
        }
        $("#secondaryList").html(_lists);
        
        toLoadProdata(data);
	})
	/**
	 * 默认加载第一个列表内容
	 */
	$("#goodsListContent").find("ul").find("li").eq(0).addClass("goodsListActive").siblings().removeClass("goodsListActive");
	$("#goodsListContent").find("ul").find("li").eq(0).children().css("display","block");
	var id = $("#goodsListContent").find("ul").find("li").eq(0).data("id");
	var secondaryImg = data[id]["pic"];
	if(secondaryImg == undefined){
		_lists="";
	}else{
		_lists += '<div class="secondaryImg"><img src="'+secondaryImg+'"/></div>';
	}
	for(var key in data[id]["children"]){
		var item = data[id]["children"][key];
		var str = '<div class="secondaryTitle" data-id='+key+'>'+
			'<span>{{name}}</span>'+
			'<i class="icon-angle-right"></i></div>';
		_lists += format(str,item);
		_lists += "<div class='secondaryContent'>"
    	for(var k in data[id]["children"][key]["children"]){
    		var item = data[id]["children"][key]["children"][k];
			var str = '<div class="goodsContents" data-id='+k+'>'+
			'<img src="{{url}}"/>'+
			'<span>{{name}}</span></div>';
			_lists+= format(str,item);
    	}
    	_lists += "</div>";
    }
    $("#secondaryList").html(_lists);
   	toLoadProdata(data);
   	screenHeight = window.screen.availHeight-50-52;
   	$("#secondaryList").css("height",screenHeight);
   	if(screenHeight < (liNum * 48)){
   		$("#goodsList").css("height",screenHeight);
   	}else{
   		$("#goodsList").css("height",liNum * 48)
   	}
   
}
/**
 * format(html,data);
 * html:要处理的字符串；
 * data：要处理的对象；
 */
function format(html,data){
	return html.replace(/{{([\w]+)}}/g,function(name,key){
			return data[key] || "";
	});
}
/**
 * loadgoodsList();
 * 下载左边的一级列表。
 */
function loadgoodsList(){
	var liNum=0;
	$.ajax({
		type:"get",
		url:"js/Eshop.json",
		success:function(data){
			for(var key in data){
				liNum++;
				var item = data[key];
				item.id = key;
				var str = "<li data-id='{{id}}'><span></span>{{name}}</li>";
				_list= format(str,item);
				$("#goodsList").append(_list);
			}
			checkgoodsList(data,liNum);
		}
	});
}
/**
 * toLoadProdata();
 * 进入商品列表二级界面，
 * loadproContent(goodsID)会传出商品的key值，4位是二级列表，6位是三级列表，需要处理出8位的四级商品列表。
 */
function toLoadProdata(data){
	var value = "value;"
	 $(".secondaryTitle").on("click",function(){
    	var goodsID = $(this).data("id");
    	//alert("去列表页，id="+goodsID)
    	loadproContent(value,goodsID,data);
    })
    $(".goodsContents").on("click",function(){
    	var goodsID = $(this).data("id");
    	//alert("去列表页，id="+goodsID)
    	loadproContent(value,goodsID,data);
    })
}


/**
 * loadproContent(goodsID);
 * 到达商品列表二级界面，
 * loadproContent(goodsID)传入商品的key值，4位是二级列表，6位是三级列表，需要处理出8位的四级商品列表。
 */
function loadproContent(value,goodsID,data){
	$("#footer").hide();
	$("#header").load("proList.html #proListHeader", function() {
		$("#toBACK").on("click",function(){
			loadGoodslistContent();
		});
		$("#goodsSearch").on("click",function(){
			
			loadgoodsSearchContent("proList",goodsID,data);
		});
	});
	$("#content").load("proList.html #proListContent", function() {
		proSortClick();
		loadproList(value,goodsID,data);
		$(window).scroll(function(){
			if($(this).scrollTop() > 200){
				$("#toTop").show();
			}else{
				$("#toTop").hide();
			}
		});
		$("#toTop").on("click",function(){
			$("html body").animate({
				scrollTop:0
			},500);
		})
	});
	
}
/**
 * proSortClick();
 * 商品排序，可扩展
 */
function proSortClick(){
	//console.log($("#proSort").find("li").eq(0)[0])
	$("#proSort").find("li").eq(0).addClass("actived");
	$("#proSort").find("li").on("click",function(){
		$(this).addClass("actived").siblings().removeClass("actived");
	})
}
/**
 * loadproList(goodsID);
 * 加载商品列表
 */
function loadproList(value,goodsID,data){
	if(goodsID.length == 4){
		var _lists = '';
		var _a=goodsID.substr(0,2);
		for(var key in data[_a]["children"][goodsID]["children"]){
        	for(var k in data[_a]["children"][goodsID]["children"][key]["children"]){
//      		var goodsLength=Object.keys(data[id]["children"][key]["children"]).length;
//      		//alert(goodsLength)
        		var item = data[_a]["children"][goodsID]["children"][key]["children"][k];
				var str = '<div class="pros" data-id='+k+'>'+
				'<img src="{{listpic}}"/><div class="pros_item">'+
				'<div class = "pro_name">{{name}}</div>'+
				'<div class = "pro_price">¥{{price}}</div>'+
				'<div class = "pro_priceago">¥{{priceago}}</div>'+
				'<div class = "pro_good">互动:{{good}}</div>'+
				'<div class = "pro_hadsold">售出:{{hadsold}}</div>'+
				'<div class = "pro_address">西部大仓发货</div>'+
				'</div></div>';
				_lists+= format(str,item);
        	}
        	_lists += "</div>";
        }
        $("#pro_list").html(_lists);
	}else if(goodsID.length == 6){
		var _lists = '';
		var _a=goodsID.substr(0,2);
		var _b=goodsID.substr(0,4);
		for(var key in data[_a]["children"][_b]["children"][goodsID]["children"]){
    		var item = data[_a]["children"][_b]["children"][goodsID]["children"][key];
			var str = '<div class="pros" data-id='+key+'>'+
			'<img src="{{listpic}}"/><div class="pros_item">'+
				'<div class = "pro_name">{{name}}</div>'+
				'<div class = "pro_price">¥{{price}}</div>'+
				'<div class = "pro_priceago">¥{{priceago}}</div>'+
				'<div class = "pro_good">互动:{{good}}</div>'+
				'<div class = "pro_hadsold">售出:{{hadsold}}</div>'+
				'<div class = "pro_address">西部大仓发货</div>'+
				'</div></div>';
			_lists+= format(str,item);
        	_lists += "</div>";
        }
        $("#pro_list").html(_lists);
	}
	$(".pros").click(function(){
		var prosID = $(this).data("id");
		loadDetailContent(prosID,data,goodsID);
	})
}
























