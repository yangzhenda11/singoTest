/**
 * 进入个人中心。
 */
function uesrCreat(){
	$("#header").load("user.html #userHeader",function(){
		$("#detailback").on("click",function(){
			loadHome()
		});
	});
	$("#content").load("user.html #userContent",function(){
		$("#exitLogin").on("click",function(){
			sessionStorage.setItem("isLogin","false");
			loginCreat();
		});
	});
	$("#footer").load("home.html #homeFooter",function(){
		$("#footer").find("ul").find("li").eq(0).on("click",function(){
			loadHome();//绑定主页按钮事件
		});
		$("#footer").find("ul").find("li").eq(1).on("click",function(){
			loadGoodslistContent();//绑定列表页按钮事件
		});
		$("#footer").find("ul").find("li").eq(3).on("click",function(){
			loadGoodsCarContent("My");//绑定购物车页按钮事件
		});
		$("#footer").find("ul").find("li").eq(4).on("click",function(){
			uesrCreat();		//个人中心
		});
	});
}
