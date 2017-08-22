var objTouch=function(spec,my){
	var touchEvent=spec || {};
	var my = my || {};
	touchEvent.tap=function(element,fn){
		var startTx, startTy;
		element.addEventListener( 'touchstart', function( e ){
		  var touches = e.touches[0];
		  touchEvent.target=touches.target;//获取事件目标
		  startTx = touches.clientX;
		  startTy = touches.clientY;
		}, false );
		element.addEventListener( 'touchend', function( e ){
		  var touches = e.changedTouches[0];
		  e.preventDefault();
		},false);
		element.addEventListener( 'touchend', function( e ){
		  var touches = e.changedTouches[0],
		    endTx = touches.clientX,
		    endTy = touches.clientY;
		  touchEvent.target = touches.target;  
		  // 在部分设备上 touch 事件比较灵敏，导致按下和松开手指时的事件坐标会出现一点点变化
		  if( Math.abs(startTx - endTx) < 6 && Math.abs(startTy - endTy) < 6 ){
		    console.log( 'fire tap event' );
		    if(fn){fn();}
		  }
		}, false );
	}
	touchEvent.doubleTap=function(element){
		var isTouchEnd = false,
		  lastTime = 0,
		  lastTx = null,
		  lastTy = null,
		  firstTouchEnd = true,
		  body = document.body,
		  dTapTimer, startTx, startTy, startTime;
		element.addEventListener( 'touchstart', function( e ){
		  if( dTapTimer ){
		    clearTimeout( dTapTimer );
		    dTapTimer = null;
		  }
		  var touches = e.touches[0];
		  startTx = touches.clientX;
		  startTy = touches.clientY;  
		  e.preventDefault();
		}, false );
		element.addEventListener( 'touchend', function( e ){
		  var touches = e.changedTouches[0],
		    endTx = touches.clientX,
		    endTy = touches.clientY,
		    now = Date.now(),
		    duration = now - lastTime;
		  	e.preventDefault();
		  // 首先要确保能触发单次的 tap 事件
		  if( Math.abs(startTx - endTx) < 6 && Math.abs(startTx - endTx) < 6 ){
		    // 两次 tap 的间隔确保在 500 毫秒以内
		    if( duration < 301 ){
		      // 本次的 tap 位置和上一次的 tap 的位置允许一定范围内的误差
		      if( lastTx !== null &&
		        Math.abs(lastTx - endTx) < 45 &&
		        Math.abs(lastTy - endTy) < 45 ){
		        firstTouchEnd = true;
		        lastTx = lastTy = null;
		        console.log( 'fire double tap event' );
		      }
		    }
		    else{
		      lastTx = endTx;
		      lastTy = endTy;
		    }
		  }
		  else{
		    firstTouchEnd = true;
		    lastTx = lastTy = null;
		  }
		  lastTime = now;
		}, false );
		// 在 iOS 的 safari 上手指敲击屏幕的速度过快，
		// 有一定的几率会导致第二次不会响应 touchstart 和 touchend 事件
		// 同时手指长时间的touch不会触发click
		if( ~navigator.userAgent.toLowerCase().indexOf('iphone os') ){
		  body.addEventListener( 'touchstart', function( e ){
		      startTime = Date.now();
		  }, true );
		  body.addEventListener( 'touchend', function( e ){
		      var noLongTap = Date.now() - startTime < 501;
		      if( firstTouchEnd ){
		          firstTouchEnd = false;
		          if( noLongTap && e.target === element ){
		              dTapTimer = setTimeout(function(){
		                  firstTouchEnd = true;
		                  lastTx = lastTy = null;
		                  console.log( 'fire double tap event' );
		              }, 400 );
		          }
		      }
		      else{
		          firstTouchEnd = true;
		      }
		  }, true );
		// iOS 上手指多次敲击屏幕时的速度过快不会触发 click 事件
		element.addEventListener( 'click', function( e ){
		  if( dTapTimer ){
		    clearTimeout( dTapTimer );
		    dTapTimer = null;
		    firstTouchEnd = true;
		  }
		}, false );
		}
	}
	touchEvent.longTap=function(element,fn){
		var startTx, startTy, lTapTimer;
		element.addEventListener( 'touchstart', function( e ){
		  if( lTapTimer ){
		    clearTimeout( lTapTimer );
		    lTapTimer = null;
		  }
		  var touches = e.touches[0];
		  startTx = touches.clientX;
		  startTy = touches.clientY;
		  lTapTimer = setTimeout(function(){
		    console.log( 'fire long tap event' );
		  }, 1000 );
		  e.preventDefault();
		}, false );
		element.addEventListener( 'touchmove', function( e ){
		  var touches = e.touches[0],
		    endTx = touches.clientX,
		    endTy = touches.clientY;
		  if( lTapTimer && (Math.abs(endTx - startTx) > 5 || Math.abs(endTy - startTy) > 5) ){
		    clearTimeout( lTapTimer );
		    lTapTimer = null;
		  }
		}, false );
		element.addEventListener( 'touchend', function( e ){
		  if( lTapTimer ){
		    clearTimeout( lTapTimer );
		    lTapTimer = null;
		  }
		}, false );
	}
	touchEvent.swipe=function(element,fnLeft,fnRight,fnUp,fnDown){
		var isTouchMove, startTx, startTy;
		element.addEventListener( 'touchstart', function( e ){
		  var touches = e.touches[0];
		  startTx = touches.clientX;
		  startTy = touches.clientY;
		  isTouchMove = false;
		}, false );
		element.addEventListener( 'touchmove', function( e ){
		  isTouchMove = true;
		  e.preventDefault();
		}, false );
		element.addEventListener( 'touchend', function( e ){
		  if( !isTouchMove ){
		    return;
		  }
		  var touches = e.changedTouches[0],
		    endTx = touches.clientX,
		    endTy = touches.clientY,
		    distanceX = startTx - endTx
		    distanceY = startTy - endTy,
		    isSwipe = false;
		  if( Math.abs(distanceX) >= Math.abs(distanceY) ){
		    if( distanceX > 20 ){
		      console.log( 'fire swipe left event' );
		      fnLeft();
		      isSwipe = true;
		    }
		    else if( distanceX < -20 ){
		      console.log( 'fire swipe right event' );    
		      isSwipe = true;
		    }
		  }
		  else{
		    if( distanceY > 20 ){
		      console.log( 'fire swipe up event' );        
		      isSwipe = true;
		    }
		    else if( distanceY < -20 ){
		      console.log( 'fire swipe down event' );         
		      isSwipe = true;
		    }
		  }
		  if( isSwipe ){
		    console.log( 'fire swipe event' );
		  }
		}, false );
	}
	return touchEvent;
}