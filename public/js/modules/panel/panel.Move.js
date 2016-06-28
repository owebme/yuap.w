(function($, $dom, _){

    yuapApp.define("panel.move");

    var App = yuapApp,
        Panel = App.panel;

    yuapApp.panel.move = {

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
                $dom.window.on('mousemove.panel', function(e){
            		WD.x = e.pageX;
            		WD.y = Math.abs(e.pageY - App.sizes.height);
                    _.raf(WD.svgCurve);
            	});

            	Panel.wrapper.on('mouseenter', function(){
            	});

            	Panel.wrapper.on('mouseleave', function(){
            	});
            },

            destroy: function(){
                $dom.window.off('mousemove.messenger');
                Panel.wrapper.off('mouseenter mouseleave');
            }
        },

        svgCurve: function() {
            if (Panel.expanded && WD.curveX < 0.001) WD.curveX = 0;
    		if ((WD.curveX > WD.x - 1) && (WD.curveX < WD.x + 1)) {
    			WD.xitteration = 0;
    		} else {
    			if (Panel.expanded) {
    				WD.targetX = 0;
                    if (Panel.elem[0].getAttribute("class").match(/hoverZone/)){
                        setTimeout(function(){
                            Panel.elem.removeClass('WD__panel--hoverZone');
                        }, 100);
                    }
    			} else {
    				WD.xitteration = 0;
    				if (WD.x > WD.hoverZone) {
    					WD.targetX = 0;
                        if (Panel.elem[0].getAttribute("class").match(/hoverZone/)){
                            setTimeout(function(){
                                Panel.elem.removeClass('WD__panel--hoverZone');
                            }, 300);
                        }
    				} else {
    					WD.targetX = -(((60 + WD.expandAmount) / 100) * (WD.x - WD.hoverZone));
                        if (!Panel.elem[0].getAttribute("class").match(/hoverZone/)){
                            Panel.elem.addClass('WD__panel--hoverZone');
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

            Panel.blobPath[0].setAttribute('d', newCurve2);

    		Panel.blob.width(WD.curveX + 60);

            //_.raf(WD.svgCurve);
        },

        easeOutExpo: function(currentIteration, startValue, changeInValue, totalIterations){
            return changeInValue * (-Math.pow(2, -10 * currentIteration / totalIterations) + 1) + startValue;
        }
    };

    var WD = yuapApp.panel.move;

})(Zepto, yuapApp.$dom, yuapApp.utils);
