window.onload=function(){
	var $section = $('.section'),posArr=[],len = $section.length;
	var winH=$(window).height();
	$section.each(function(e){
		var $index = $(this).index(".section");
		posArr[$index] = $(this).offset().top;
	})
	window.onscroll =function(){
		var wTop = document.body.scrollTop;
		for(var i = 0;i<len;i++){
			var val=winH-$section.eq(i).height();
			if(wTop >posArr[i]-val/1.2){
				$section.eq(i).addClass('focus');
			}
		}
	}
	/*特惠图4*/
	var bubWid= $(".imgbubbles").width();
	$(".imgbubbles").height(bubWid);
	/*right_layer*/
	$(".rights img").on("click",function(){	
		var i=$(this).index(),flag=1,
				imgUrl=$(this).attr("data-img"),
				imgStr="<img src='"+imgUrl+"' />";
				console.log(imgUrl);
		$(".rightmsg").empty().html(imgStr);
		$(".rightblank").show();
	})
	$(".rightlayerx").on("click",function(){
		$(".rightblank").fadeOut();
	})
}
