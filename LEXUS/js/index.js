/*内容切换——swiper.js*/
var mainSwiper = new Swiper('#mainSwiper', {
      pagination: '#homeBannerPn',
      calculateHeight: false,
      onSlideChangeEnd: function() {
        var year = 2016 - mainSwiper.activeIndex;
        $("#footer img").hide().removeClass('animated rubberBand');
        $("#footerWord" + year).show().addClass('animated rubberBand');
      }
    });
var originScalePosX = [7, 37.5, 62.5, 90];
var originScalePosY = [5, 20, 40, 60, 76];
var modalSwiper = new Swiper('#modalSwiper', {
      direction: 'vertical',
      slidesPerView: 'auto',
      mousewheelControl: true,
      freeMode: true
    });
var play = true;
$(function(){
  /*getShare({
    jsApiList: ["previewImage"]
  });*/
  $("#loadingWrapperBase").hide();
  setModalTitleHeight();
  initClickEvent();
  setBGM();
  /*获取时间*/
	showTime();
	var dateTimer=setInterval(showTime,1000);
	function showTime(){
		var localDate=new Date(),
				week = new Array('星期日','星期一','星期二','星期三','星期四','星期五','星期六'),
				month=localDate.getMonth()+1,
				tody=localDate.getDate(),
				weekDay=week[localDate.getDay()],
				hours=localDate.getHours(),
				minute=localDate.getMinutes();
				(month<10)?month="0"+month:month;
				(tody<10)?tody="0"+tody:tody;
				(hours<10)?hours="0"+hours:hours;
				(minute<10)?minute="0"+minute:minute;
				$(".lock-time").html(hours+":"+minute);
				$(".lock-date").html(month+"月"+tody+"日&emsp;"+weekDay);
	}
});

/*触控框架(单击、长击、左滑、右滑)——toucher.js*/
function initClickEvent() {
  var lockTouch = util.toucher($('#lockPage')[0]);
  var lockWordTouch = util.toucher($(".lock-word-wrapper")[0]);
  lockTouch.on('swipeRight', function(e) {
    showMain();
  }).on('swipeLeft', function(e) {
    showMain();
  });
  lockWordTouch.on('singleTap', function(e) {
    showMain();
  });
  $(".lock-word-wrapper, #lockBottom").on("click", function(e) {
    showMain();
  });
  var bodyTouch = util.toucher($('body')[0]);
  bodyTouch.on("singleTap", function(e) {
    $(".nav-item").removeClass('buzz-out');
  });
  $('.nav-icon').each(function(index, item) {
    var iconTouch = util.toucher(item);
    iconTouch.on('longTap', function(e) {
      $(".nav-item").addClass('buzz-out');
    });
  });
  $(".btn-cancel").on("click", function(){
    $(".swiper-section, #contentModal").css("visibility", "visible").removeClass('show-modal').addClass('hide-modal');
    setTimeout(function(){
      $(".swiper-section").css("visibility", "inherit");
    }, 350);
  });
  /*消除300ms的点击延迟——FastClick.js*/
  FastClick.attach($(".btn-cancel")[0]);
  $(".add-modal-content, #lockPage").on("click", function(event) {
    event.stopPropagation();
  });
  $("#mainSwiper .nav-item").on("click", function(event) {
    event.stopPropagation();
    var $this = $(this);
    var col = $this.index() + 1;
    var row = $this.closest('.nav-item-wrapper').index() + 1;
    var year = 16 - $this.closest('.swiper-slide').index();
    var type = $this.attr("data-type");
    switch(type){
      case "additional":
        showAddModalSHFB(event);
        break;
      case "img":
        showImgModal(this, "" + year + "0" + row + "0" + col);
        break;
      case "share":
        showShare();
        break;
      case "music":
        controlMusic();
        break;
      default:
        showContentModal(this, "" + year + "0" + row + "0" + col);
    }
  });
  /*消除300ms的点击延迟——FastClick.js*/
  $("#mainSwiper .nav-item").each(function(index, item) {
    FastClick.attach(item);
  });
}

function showAddModalSHFB(event) {
  $(".swiper-section, .add-modal.shfb").css({
    "-webkit-transform-origin": originScalePosX[0] + "% " + originScalePosY[4] + "%",
    "transform-origin": originScalePosX[0] + "% " + originScalePosY[4] + "%"
  }).removeClass('hide-modal').addClass('show-modal');
  // setTimeout(function(){
  //   $(".swiper-section, #main").css("visibility", "hidden");
  // }, 200);
  event.stopPropagation();
}

function hideAddModalSHFB() {
  $("#main").css("visibility", "visible");
  $(".swiper-section, .add-modal.shfb").css("visibility", "visible").removeClass('show-modal').addClass('hide-modal');
  setTimeout(function(){
    $(".swiper-section").css("visibility", "inherit");
  }, 350);
}
function setModalTitleHeight() {
  var winWidth = $(window).width();
  var realWidth = winWidth > 640 ? 640 : winWidth;
  var imgWidth = realWidth * 0.85;
  var imgHeight = imgWidth * 276 / 640;
  $(".modal-title").css("height", imgHeight);
}
function showContentModal(obj, item) {
  var src = "img/content/" + item + ".png"; //"assets/images/modal/content/" + item + ".png"
  showModal(obj, item);
  $("#modalContent").attr("style", "");
  /*if(item == "160302" || item == "150204") {
    $("#modalContent").css("padding-right", 0);
  } else if(item == "160304" || item == "150301") {
    $("#modalContent").css({"padding-right": 0,"padding-left": 0});
  } else if(item == "160202") {
    $("#modalContent").css("padding-top", "55px");
  } else if(item == "160204" || item == "160303") {
    $("#modalContent").css({"padding-right": "15px","padding-left": "5px"});
  }*/
  $("#modalContentImg").attr("src", src).show();
  $("#modalImgList").hide();
  preImage(src, function() {
    modalSwiper.onResize();
    //$("#modalContentImg").addClass('animated rubberBand');
  });
}
function showImgModal(obj, item) {
	alert(item);
  showModal(obj, item);
  $("#modalContentImg").hide();
  showImgList("20" + item.substring(0, 2));
  $("#modalImgList").show();
  setTimeout(function(){
    modalSwiper.onResize();
  }, 1000);
}
function showModal(obj, item) {
  $("#contentModal").attr("data-item", item);
  $(".swiper-section, #contentModal").css({
    "-webkit-transform-origin": originScalePosX[item.substring(4,6) - 1] + "% " + originScalePosY[item.substring(2,4) - 1] + "%",
    "transform-origin": originScalePosX[item.substring(4,6) - 1] + "% " + originScalePosY[item.substring(2,4) - 1] + "%"
  }).removeClass('hide-modal').addClass('show-modal');
  /*
  setTimeout(function(){
    $(".swiper-section").css("visibility", "hidden");
  }, 200);
  */
}
function showImgList(year) {
  var imgNum = 4;
  var arr = [];
  var imgUrlBase = "http://zshn.rednet.cn/wp/20162h2/";
  $("#modalImgList").empty();
  for(var i = 1; i <= imgNum; i++ ) {
    var imgUrl = imgUrlBase + "images/photo/" + year + "/" + i + ".jpg"; //"assets/images/photo/" + year + "/" + i + ".jpg"
    arr.push(imgUrl);
  }
  for(var i = 1; i <= imgNum; i++ ) {
    var imgUrl = imgUrlBase + "images/photo/" + year + "/" + i + ".jpg"; //"assets/images/photo/" + year + "/" + i + ".jpg"
    showOneImg(imgUrl, arr);
  }
}
function showOneImg(imgUrl, imgArray) {
  var $imgItem = $("<div>").addClass('img-item').css("background-image", "url(" + imgUrl + ")");
  var $tempImg = $("<img>").attr("src", "images/temp.jpg");
  $imgItem.on("click", function(){
    wx.previewImage({
      current: imgUrl, // 当前显示的图片链接
      urls: imgArray // 需要预览的图片链接列表
    });
  });
  $imgItem.append($tempImg);
  $("#modalImgList").append($imgItem);
}
function showMain() {
  $("#homeWrapper").css("visibility", "visible");
  $(".swiper-section").addClass('animated pulse');
  setTimeout(function(){
    $(".swiper-section").removeClass('animated pulse');
  }, 1100);
  $("#footerWord2016").addClass('animated rubberBand');
  $(".bg-animate-wrapper").addClass('entered')
  $("#lockPage").hide();
}
function showShare() {
  $("#main, .swiper-section").css("visibility", "hidden");
  $("#shareModal").show();
  $("#footer").hide();
  $("#shareModal #shareImg").addClass('animated rotateInDownLeft');
}
function hideShare() {
  $("#main, .swiper-section").css("visibility", "visible");
  $("#shareModal").hide();
  $("#footer").show();
  $("#shareModal #shareImg").removeClass('animated rotateInDownLeft');
}
function preImage(url, callback){ //预加载图片
  var img = new Image(); //创建一个Image对象，实现图片的预下载
  img.src = url;
  if (img.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数
    callback.call(img);
    return; // 直接返回，不用再处理onload事件
  }
  img.onload = function () { //图片下载完毕时异步调用callback函数。
    callback.call(img);//将回调函数的this替换为Image对象
  };
}
function setBGM(){ //设置背景音乐
  var $audio = $('<audio/>').attr({'id':'music','loop':'loop'}).hide();
  $audio.append($("<source/>").attr({"src":"music/I.Prelude.mp3","type":"audio/mpeg"}))
    .append($("<source/>").attr({"src":"music/I.Prelude.ogg","type":"audio/ogg"}));
  $('body').append($audio);
  $("#music")[0].play();
}
function controlMusic() {//控制背景音乐：播放、暂停
  if(play) {
    $("#music")[0].pause();
    $(".music").hide();
    $(".no-music").show();
  } else {
    $("#music")[0].play();
    $(".no-music").hide();
    $(".music").show();
  }
  play = !play;
}