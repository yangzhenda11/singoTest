/**
 * 进入主界面。
 */
function loadHome(){
	$("#header").load("home.html #homeHeader",function(){
		$("#inputSearch").on("click",function(){
			loadgoodsSearchContent("home");
		});
	});
	$("#content").load("home.html #homeContent",function(){
		var mySwiper1 = new Swiper ('#homeBanner', {
		    loop: true,
		    autoplay:3000,
		    autoplayDisableOnInteraction:false,
		    // 如果需要分页器
		    pagination: '.swiper-pagination'
		  });  
		var mySwiper2 = new Swiper ('#EBanner', {
			loop: true,
			autoplayDisableOnInteraction:false,
			// 如果需要分页器
			pagination: '.swiper-pagination'
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
			loadGoodsCarContent("home");//绑定购物车页按钮事件
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
}