function loginCreat(){
	$("#header").load("login.html #ones");
	$("#content").load("login.html #loginSection",function(){
		logins();
	});
	$("#footer").load("login.html #loginFooter");
}

function logins(){
	$("#normalonload").on("click",function(){
		$(".phoneonload").removeClass("hidden");
		$(".normalonload").removeClass("hidden");
		$(".phoneonload").addClass("hidden");
		$(".Password").addClass("hidden");
		$("#userName").attr("placeholder","手机号/邮箱/用户名")
		$("#userPass").attr("placeholder","输入密码");
		$("#userName").val("");
		$("#userPass").val("");
//		$("#users").addClass("icon-user");
//		$("#users").removeClass("icon-tablet");
	});
	$("#phoneonload").on("click",function(){
		$(".phoneonload").removeClass("hidden");
		$(".normalonload").addClass("hidden");
		$(".Password").removeClass("hidden");
		$("#userName").attr("placeholder","已注册的手机号")
		$("#userPass").attr("placeholder","动态密码");
		$("#userName").val("");
		$("#userPass").val("");
//		$("#users").removeClass("icon-user");
//		$("#users").addClass("icon-tablet");
	});	
	$("#reg").on("click",function(){
		registerCreat();
	});
	$("#backHome").on("click",function(){
		loadHome();
	});
}

