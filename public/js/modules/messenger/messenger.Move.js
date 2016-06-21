(function($, $dom, _){

    yuapApp.define("messenger.move");

    var App = yuapApp,
        Messenger = App.messenger;

    yuapApp.messenger.move = {

        init: function(){

        	WD.x = 0;
            WD.y = App.sizes.height / 2;
            WD.curveX = 0.
            WD.curveY = 0;
            WD.targetX = 0;
            WD.xitteration = 0;
            WD.yitteration = 0;
            WD.hoverZone = 200;
        	WD.expandAmount = 20;
            WD.interval = null;

            WD.svgCurve();
        },

        hover: {

            init: function(){
                $dom.window.on('mousemove.messenger', function(e){
            		WD.x = Math.abs(e.pageX - App.sizes.width);
            		WD.y = e.pageY;
                    _.raf(WD.svgCurve);
            	});

            	Messenger.wrapper.on('mouseenter', function(){
            		clearTimeout(WD.interval);
            		Messenger.elem.addClass('WD__messenger--expanded');
            		Messenger.expanded = true;
            	});

            	Messenger.wrapper.on('mouseleave', function(){
            		WD.interval = setTimeout(function(){
                        if (!Messenger.viewer.active){
                			Messenger.elem.removeClass('WD__messenger--expanded');
                			Messenger.expanded = false;
                        }
            		}, 500);
            	});
            },

            destroy: function(){
                $dom.window.off('mousemove.messenger');
                Messenger.wrapper.off('mouseenter mouseleave');
            }
        },

        svgCurve: function() {
            if (Messenger.expanded && WD.curveX < 0.001) WD.curveX = 0;
    		if ((WD.curveX > WD.x - 1) && (WD.curveX < WD.x + 1)) {
    			WD.xitteration = 0;
    		} else {
    			if (Messenger.expanded) {
    				WD.targetX = 0;
                    if (Messenger.elem[0].getAttribute("class").match(/hoverZone/)){
                        setTimeout(function(){
                            Messenger.elem.removeClass('WD__messenger--hoverZone');
                        }, 100);
                    }
    			} else {
    				WD.xitteration = 0;
    				if (WD.x > WD.hoverZone) {
    					WD.targetX = 0;
                        if (Messenger.elem[0].getAttribute("class").match(/hoverZone/)){
                            setTimeout(function(){
                                Messenger.elem.removeClass('WD__messenger--hoverZone');
                            }, 300);
                        }
    				} else {
    					WD.targetX = -(((60 + WD.expandAmount) / 100) * (WD.x - WD.hoverZone));
                        if (!Messenger.elem[0].getAttribute("class").match(/hoverZone/)){
                            Messenger.elem.addClass('WD__messenger--hoverZone');
                        }
    				}
    			}
    			WD.xitteration++;
    		}

    		if ((WD.curveY > WD.y - 1) && (WD.curveY < WD.y + 1)) {
    			WD.yitteration = 0;
    		} else {
    			WD.yitteration = 0;
    			WD.yitteration++;
    		}

    		WD.curveX = WD.easeOutExpo(WD.xitteration, WD.curveX, WD.targetX - WD.curveX, 100);
    		WD.curveY = WD.easeOutExpo(WD.yitteration, WD.curveY, WD.y - WD.curveY, 100);

    		var anchorDistance = 200;
    		var curviness = anchorDistance - 40;

    		var newCurve2 = "M60,"+App.sizes.height+"H0V0h60v"+(WD.curveY-anchorDistance)+"c0,"+curviness+","+WD.curveX+","+curviness+","+WD.curveX+","+anchorDistance+"S60,"+(WD.curveY)+",60,"+(WD.curveY+(anchorDistance*2))+"V"+App.sizes.height+"z";

            Messenger.blobPath[0].setAttribute('d', newCurve2);

    		Messenger.blob.width(WD.curveX + 60);

            //_.raf(WD.svgCurve);
        },

        easeOutExpo: function(currentIteration, startValue, changeInValue, totalIterations){
            return changeInValue * (-Math.pow(2, -10 * currentIteration / totalIterations) + 1) + startValue;
        }
    };

    var WD = yuapApp.messenger.move;

})(Zepto, yuapApp.$dom, yuapApp.utils);
