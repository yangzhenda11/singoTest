function loadGoodsCarContent(type,goodsID,data,prosID){
	$("#header").load("cartgory.html #carHeader",function(){
		$(".back").on("click",function(){
			if(type == "goodslist"){
				loadGoodslistContent();
			}else if(type =="proList"){
				loadDetailContent(prosID,data,goodsID);
			}else if(type =="home"){
				loadHome();
			}else if(type == "My"){
				var login = sessionStorage.getItem("isLogin") || null;
				if(login == "true"){
					uesrCreat();//绑定个人中心页按钮事件
				}else{
					loginCreat();//绑定登录注册页按钮事件
				}
			}
		});
	});
	if(localStorage.getItem("ePetCar")){
		$("#content").load("cartgory.html #goodsCar",function(){
			bindCtrl();
			goodsSum();
		});
	}else{
		$("#content").load("cartgory.html #nogoodCar");
	}
	$("#footer").load("cartgory.html #carFooter");
}
/**
 * 绑定选择事件
 */
function bindCtrl(){
	$("#checkAll").on("click",function(){
		if($(this).prop("checked")){
			$("input[type='checkbox']").prop("checked",true);
		}else{
			$("input[type='checkbox']").prop("checked",false);
		}
	});
	$("input[type='checkbox']").not("#checkAll").on("click",function(){
		if($(this).prop("checked")==false){
			$("#checkAll").prop("checked",false);
		}
		var flag=true;
		$("input[type=checkbox]").not("#checkAll").each(function(i){
			if(this.checked==false){
				flag=false;
			}
		});
		if(flag){
			$("#checkAll").prop("checked",true);
		}
	});
}
/**
 * 绑定数量计算事件
 */
function goodsSum(){
	$(".dec").on("click",function(){
		var num = Number($(this).next("input").val());
		if(num > 1){
			num -= 1;
			$(this).next("input").val(num);
		}
	});
	$(".plus").on("click",function(){
		var num = Number($(this).prev("input").val());
		num += 1;
		$(this).prev("input").val(num);
	});
}
