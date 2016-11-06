function registerCreat(){
	$("#header").load("register.html #registerHeader",function(){
		registerCom();
	});
	$("#content").load("register.html #regcontent");
	$("#footer").load("register.html #regfooter");
}
function registerCom(){
	var codeStr = "";
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var lg = ctx.createLinearGradient(0,0,60,30);
	lg.addColorStop(0,"red");
	lg.addColorStop(1,"blue");
	ctx.strokeStyle = lg;
	ctx.font = "20px 黑体";
	ctx.textBaseline = "top";
	changeCode();
	refresh.onclick = function(){
		changeCode();
	}
	function changeCode(){
		ctx.clearRect(0,0,100,30);
		ctx.strokeText(getData(),15,5);
	}
	function getData(){
		codeStr = Math.floor(Math.random()*9000) + 1000;
		return codeStr;
	}
	var k = 0;
	function listshow(){
		$("#registerList").on("click",function(){
			if(k % 2 == 0){
				$("#show_list").removeClass("hidden");
			}else{
				$("#show_list").addClass("hidden");
			}
			k++;
		});
		$("#moveToHome").on("click",function(){
			loadHome();//绑定主页按钮事件
		});
		$("#moveToLise").on("click",function(){
			loadGoodslistContent();//绑定列表页按钮事件
		});
		$("#moveToCar").on("click",function(){
			loadGoodsCarContent("My");//绑定购物车页按钮事件
		});
		$("#moveToMy").on("click",function(){
			loginCreat();//绑定登录注册页按钮事件
		});
	}
	listshow();
	function nextStept(){
		var strings = $("#phonesnum").val();
		$("#phonesnum").blur(function(){
			strings = $("#phonesnum").val();
			clicks(strings);
		})
		$(".one").on("click",function(){
			alertthing();
		})
	}
	function clicks(strings){
		$(".one").off();
		$(".one").on("click",function(){
			if(/^1[34578]\d{9}$/.test(strings)){ 
				$("#phonesnum2").val(strings);
				$("#checkPhoneNum").addClass("hidden")
				$("#registering").removeClass("hidden");
			}else{
				alertthing();
			}
		})
	}
	function alertthing(){
		$("#positionA").removeClass("hidden");
	    $("#positionB").removeClass("hidden");
	    $(".Sure").on("click",function(){
	    	$("#positionA").addClass("hidden");
	   		$("#positionB").addClass("hidden");
	    })
	}
	nextStept();
		$("#numIdentify").on("click",function(){
			$(".messageNum").val("666666");
		});
	function Check(){
		var str = $(".messageNum").val();
		var str1 = $(".user_name").val();
		var str2 = $(".user_password").val();
		var str3 = $(".user_password2").val();
		var str4 = $(".yanzheng").val();
		if(/\w{6}/.test(str)){
			if(/\w/.test(str1)){
				if(/\w{6,20}/.test(str2)){
					if(str2 == str3){
						if(str4 == codeStr){
							alertthing();
		    				$("#message").html("注册成功");
		    				
						}else{
							alertthing();
							changeCode();
		    				$("#message").html("验证码不正确");
						}
					}else{
						alertthing();
						changeCode();
		    			$("#message").html("密码设置不一致，请重新设置");
					}
				}else{
					alertthing();
					changeCode();
		    		$("#message").html("使用数字字母下划线设置长度大于6小于20的密码");
				}
			}else{
				alertthing();
				changeCode();
		    	$("#message").html("用户名使用数字字母下划线");
			}
		}else{
			alertthing();
			changeCode();
		    $("#message").html("短信验证码错误");
		}
	}
	function nextStept2(){
		$(".user_name").focus(function(){
			$(this).attr("placeholder","数字、字母、下划线")
		});
		$(".user_name").blur(function(){
			$(this).attr("placeholder","你的昵称/用户名")
		});
		$(".user_password").focus(function(){
			$(this).attr("placeholder","数字、字母、下划线设置不少于6位的密码")
		});
		$(".user_password").blur(function(){
			$(this).attr("placeholder","请输入密码")
		});
		$(".two").on("click",function(){
			Check();
		});
		$("#goBackLogin").on("click",function(){
			loginCreat();
		});
	}
	nextStept2()
}
	