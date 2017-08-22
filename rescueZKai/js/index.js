function pageinit() {
	$(".page").css({
		"width": $(window).width() + "px",
		"height": $(window).height() + "px"
	});
	$(".page_1_switch").css({
		"top": $(window).width() * 0.466 + "px",
		"height": $(window).width() * 0.083 + "px"
	});
	$(".page_4_iphone").css({
		"top": $(window).width() * 0.957 + "px",
		"height": $(window).width() * 0.338 + "px"
	});
	$(".page_5_touchblock").css({
		"top": $(window).width() * 1.181 + "px",
		"height": $(window).width() * 0.139 + "px"
	});
	$(".page_8_sunvisor").css({
		"top": $(window).width() * 0.341 + "px",
		"height": $(window).width() * 0.126 + "px"
	});
	$(".page_8_box").css({
		"top": $(window).width() * 0.833 + "px",
		"height": $(window).width() * 0.213 + "px"
	});
	$(".page_7_startbtn").css({
		"top": $(window).width() * 1 + "px"
	});
	$(".page_8_key").css({
		"top": $(window).width() * 0.85 + "px",
		"height": $(window).width() * 0.15 + "px"
	});
	$(".page_9_photobox").css({
		"top": $(window).width() * 0.88 + "px",
		"height": $(window).width() * 0.20 + "px"
	});
	$(".page_9_ropebox").css({
		"top": $(window).width() * 0.9 + "px",
		"height": $(window).width() * 0.65 + "px"
	});
	$(".page_9_photo").css({
		"top": $(window).width() * 0.6 + "px",
		"height": $(window).width() * 0.3 + "px"
	});
	$(".page_9_rope").css({
		"top": $(window).width() * 0.75 + "px",
		"height": $(window).width() * 0.38 + "px"
	});

	$(".page_10_shovelbox").css({
		"top": $(window).width() * 1.05 + "px",
		"height": $(window).width() * 0.2 + "px"
	});
	$(".page_10_bottlebox").css({
		"top": $(window).width() * 0.97 + "px",
		"height": $(window).width() * 0.22 + "px"
	});
	$(".page_10_shovel").css({
		"top": $(window).width() * 1.18 + "px",
		"height": $(window).width() * 0.3 + "px"
	});
	$(".page_10_bottle").css({
		"top": $(window).width() * 0.67 + "px",
		"height": $(window).width() * 0.2 + "px"
	});
}
var stay_timer, stay_num = 0;

function checkfont() {
	if (get_key) {
		stay_timer = setInterval(function() {
			stay_num++;
			if (stay_num >= 2) {
				$(".page_8 .poptip").fadeIn();
			}
		}, 1000);

	}
}

function checkback() {
	if (get_rope && get_photo) {
		stay_timer = setInterval(function() {
			stay_num++;
			if (stay_num >= 4) {
				$(".page_9 .poptip").fadeIn();
			}
		}, 1000);
	}
}

function checkbackbox() {
	if (get_shovel && get_bottle) {
		stay_timer = setInterval(function() {
			stay_num++;
			if (stay_num >= 4) {
				$(".page_10 .poptip").fadeIn();
			}
		}, 1000);
	}
}

function add_animation(obj) {
	$(obj).find(".will_animate").each(function() {
		$(this).removeClass($(this).attr("animation-class"));
	});
	$(obj).find(".will_animate").each(function() {
		$(this).addClass($(this).attr("animation-class"));
	});
}

function checksuc() {
	if ( get_key && get_photo && get_rope && get_bottle && get_shovel) {
		setTimeout(function() {
			game_status = true;
			page_special_remove(current_page);
			$(current_page).fadeOut();
			$(".page_11").fadeIn();
			add_animation($(".page_11")[0]);
			page_special($(".page_11")[0]);
			current_page = $(".page_11")[0];
		}, 1000);
		setTimeout(function(){
			$(".ticking_audio")[0].pause();
		},2000);
	}
}

function page_special(obj) {
	if ($(obj).hasClass("page_1")) {
		setTimeout(function() {
			$(".page_1_switch").addClass("page_1_switchact").removeClass("jumpdisable");
		}, 2000);
	} else if ($(obj).hasClass("page_2")) {
		$(".page_2_closemusic")[0].play();
		setTimeout(function() {
			$(".page_2_hideclick").click();
		}, 5000);
	} else if ($(obj).hasClass("page_3")) {
		setTimeout(function() {
			$(".page_3_hideclick").click();
		}, 2000);
	} else if ($(obj).hasClass("page_4")) {
		setTimeout(function() {
			$(".ringtone")[0].play();
			$(".page_4 .page_mainimg").attr("src", "img/s04.jpg");
		}, 1000);
		setTimeout(function(){
			$(".page_4_iphone").click();
		},4000);
	} else if ($(obj).hasClass("page_6")) {
		setTimeout(function() {
			$(".page_6_tip").animate({
				top: "70%"
			}, 2000);
			$(".page_6_out")[0].play();
		}, 1000);
		setTimeout(function() {
			$(".page_6_busy")[0].play();
		}, 12000);
		setTimeout(function() {
			$(".page_6_busy")[0].pause();
			$(".page_6_hideclick").click();
		}, 15000);
	} else if ($(obj).hasClass("page_8")) {
		checkfont();
	}  else if ($(obj).hasClass("page_8_21")) {
		get_key = true;
		$(".page_8_box").addClass("jumpdisable");
		$(".page_8_key").addClass("jumpdisable");
		$(".tip_key").css({"opacity":"1"});
		$(".ticking_audio")[0].pause();
		$(".dingding")[0].play();
		$(".dingding").on("ended", function() {
			$(".ticking_audio")[0].play();
		});
		checksuc();
	} else if ($(obj).hasClass("page_9")) {
		checkback();
	} else if ($(obj).hasClass("page_9_11")) {
		get_photo = true;
		$(".page_9_photo").addClass("jumpdisable");
		$(".page_9_photobox").addClass("jumpdisable");
		$(".tip_photo").css({"opacity":"1"});
		$(".ticking_audio")[0].pause();
		$(".dingding")[0].play();
		$(".dingding").on("ended", function() {
			$(".ticking_audio")[0].play();
		});
		checksuc();
	} else if ($(obj).hasClass("page_9_21")) {
		get_rope = true;
		$(".page_9_rope").addClass("jumpdisable");
		$(".page_9_ropebox").addClass("jumpdisable");
		$(".tip_rope").css({"opacity":"1"});
		$(".ticking_audio")[0].pause();
		$(".dingding")[0].play();
		$(".dingding").on("ended", function() {
			$(".ticking_audio")[0].play();
		});
		checksuc();
	} else if ($(obj).hasClass("page_10")) {
		if (firstbackbox) {
			$(".ticking_audio")[0].pause();
			$(".backbox_audio")[0].play();
			$(".backbox_audio").on("ended", function() {
				$(".ticking_audio")[0].play();
			});
			firstbackbox = false;
		}
		checkbackbox();
	} else if ($(obj).hasClass("page_10_11")) {
		get_shovel = true;
		$(".page_10_shovel").addClass("jumpdisable");
		$(".page_10_shovelbox").addClass("jumpdisable");
		$(".tip_hammar").css({"opacity":"1"});
		$(".ticking_audio")[0].pause();
		$(".dingding")[0].play();
		$(".dingding").on("ended", function() {
			$(".ticking_audio")[0].play();
		});
		checksuc();
	} else if ($(obj).hasClass("page_10_21")) {
		get_bottle = true;
		$(".page_10_bottle").addClass("jumpdisable");
		$(".page_10_bottlebox").addClass("jumpdisable");
		$(".tip_bottle").css({"opacity":"1"});
		$(".ticking_audio")[0].pause();
		$(".dingding")[0].play();
		$(".dingding").on("ended", function() {
			$(".ticking_audio")[0].play();
		});
		checksuc();
	}else if($(obj).hasClass("page_11")){
		$("audio").each(function(){
			this.pause();
		});
	}
}

function page_special_remove(obj) {
	if ($(obj).hasClass("page_7")) {
		$(".ticking_audio")[0].play();
		
		$(".tip_box").fadeIn();
	}
}
$(window).load(function() {
	$("audio").each(function() {
		this.play();
		this.pause();
	});
	$(".loader_inner").stop().animate({
		width: "100%"
	}, 3000);
	$(".page_0_hideclick").click();
	//	var str = $(".page_0_type_area").attr("data-typetext");
	//	typetext($(".page_0_type_area")[0], str, 0);
	//	setTimeout(function() {
	//		$(".page_0_clickcontinue").fadeIn();
	//		$(".page_0").removeClass("jumpdisable");
	//	}, 8000);
});
$(document).ready(function() {
	var touch_sx = 0,
		touch_ex = 0;
	$(".loader_inner").animate({
		width: "98%"
	}, 3000);
	pageinit();
	$(".clickjump").click(function() {
		if (!$(this).hasClass("jumpdisable")) {
			var thispage;
			if ($(this).hasClass("page")) {
				thispage = $(this);
			} else {
				thispage = $(this).parents(".page");
			}
			if ($(this).hasClass("immediately")) {
				thispage.hide();
				$($(this).attr("data-destination")).show();
			} else {
//				thispage.fadeOut();
//				$($(this).attr("data-destination")).fadeIn();
				thispage.hide();
				$($(this).attr("data-destination")).show();
			}
			
			if($(this).hasClass("once")){
				$(this).addClass("jumpdisable");
			}
			var obj = $($(this).attr("data-destination"))[0];
			page_special_remove(thispage[0]);
			add_animation(obj);
			page_special(obj);
			current_page = obj;
		}
	});

	$(document).on("touchstart", ".page_5_touchblock", function(e) {
		e.preventDefault();
		touch_sx = e.originalEvent.targetTouches[0].clientX;
		touch_ex = e.originalEvent.targetTouches[0].clientX;
	});
	$(document).on("touchmove", ".page_5_touchblock", function(e) {
		e.preventDefault();
		touch_ex = e.originalEvent.targetTouches[0].clientX;
	});
	$(document).on("touchend", ".page_5_touchblock", function(e) {
		e.preventDefault();
		if (touch_ex - touch_sx > 30) {
			$(".page_5_hideclick").click();
			$(".ringtone")[0].pause();
		}
	});

});