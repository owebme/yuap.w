(function($, $dom, _){

    yuapApp.define("reviews.modal");

    var prefixed = yuapApp.prefixed;

    yuapApp.reviews.modal = {

        active: false,

        init: function(){

            WD.elem = _.template("reviewsModal");
            WD.wrapper = WD.elem.find(".WD__modal__wrapper");
            WD.container = WD.wrapper.find(".WD__modal__container");
            WD.closeButton = WD.elem.find(".WD__modal__close");

            WD.render();
            WD.form.init();
            WD.rangeSlider.init();
        },

        render: function(){

            WD.wrapper.find(".WD__modal__arrow__right").on("click", function(){
                WD.container.addClass("WD__modal__container--next");

                _.onEndAnimation(WD.container[0], function(){
                    setTimeout(function(){
                        WD.container.removeClass("WD__modal__container--next");
                    }, 400);
                });
            });

            WD.wrapper.find(".WD__modal__arrow__left").on("click", function(){
                WD.container.addClass("WD__modal__container--prev");

                _.onEndAnimation(WD.container[0], function(){
                    setTimeout(function(){
                        WD.container.removeClass("WD__modal__container--prev");
                    }, 400);
                });
            });

            WD.wrapper.find(".WD__reviews__button").on("click", function(){
                WD.form.open();
            });

            WD.closeButton.on("click", function(){
                WD.close();
            });
        },

        rangeSlider: {

            init: function(){

                WD.rangeSlider.elem = WD.form.elem.find(".WD__modal__slider__range__input");
                WD.rangeSlider.smile = WD.form.elem.find(".WD__modal__sendReview__smile");
                WD.rangeSlider.result = WD.form.elem.find(".WD__modal__sendReview__score__text");

                WD.rangeSlider.render();
            },

            render: function(){

                WD.rangeSlider.elem.rangeslider({
                    polyfill: false,
                    orientation: 'horizontal',
                    rangeClass: 'WD__modal__slider__range__container',
                    horizontalClass: 'WD__modal__slider__range--horizontal',
                    fillClass: 'WD__modal__slider__track',
                    handleClass: 'WD__modal__slider__handle',

                    onInit: function() {
                        WD.rangeSlider.elem.next().prepend('<span class="WD__modal__slider__title">выберите оценку</span>');
                    },

                    onSlide: function(position, value) {
                        WD.rangeSlider.result.text(value % 1 ? value : value + ".0");
                        if (value > 9.5) WD.rangeSlider.smile.attr("src", "/public/images/smiles/smile1.svg");
                        else if (value > 8 && value < 10) WD.rangeSlider.smile.attr("src", "/public/images/smiles/smile2.svg");
                        else if (value > 5.5 && value < 8.5) WD.rangeSlider.smile.attr("src", "/public/images/smiles/smile3.svg");
                        else if (value > 3.5 && value < 6) WD.rangeSlider.smile.attr("src", "/public/images/smiles/smile4.svg");
                        else if (value > 1.5 && value < 4) WD.rangeSlider.smile.attr("src", "/public/images/smiles/smile5.svg");
                        else if (value < 2) WD.rangeSlider.smile.attr("src", "/public/images/smiles/smile6.svg");
                    }

                    // onSlideEnd: function(position, value) {
                    //     WD.rangeSlider.result.text(value);
                    // }
                });
            }
        },

        form: {

            active: false,

            init: function(){

                WD.form.elem = WD.elem.find(".WD__modal__sendReview");
                WD.form.share = WD.form.elem.find(".WD__modal__share");

                WD.form.render();
            },

            render: function(){

                var $shareContainer = $(".WD__modal__share")
                    ,$shareButtons = $shareContainer.find(".WD__modal__share__button")
            		,$toggleButton = $shareContainer.find(".WD__modal__share__toggle__button")

            		,menuOpen=false
            		,buttonsNum=$shareButtons.length
            		,buttonsMid=(buttonsNum/2)
            		,spacing=75
            	;

            	function openShareMenu(){
            		TweenMax.to($toggleButton,0.1,{
            			scaleX:1.2,
            			scaleY:0.6,
            			ease:Quad.easeOut,
            			onComplete:function(){
            				TweenMax.to($toggleButton,.8,{
            					scale:0.6,
            					ease:Elastic.easeOut,
            					easeParams:[1.1,0.6]
            				})
            				TweenMax.to($toggleButton.children(".WD__modal__share__icon"),.8,{
            					scale:1.4,
            					ease:Elastic.easeOut,
            					easeParams:[1.1,0.6]
            				})
            			}
            		})
            		$shareButtons.each(function(i){
            			var $cur=$(this);
            			var pos=i-buttonsMid;
            			if(pos>=0) pos+=1;
            			var dist=Math.abs(pos);
            			$cur.css({
            				zIndex:buttonsMid-dist
            			});
            			TweenMax.to($cur,1.1*(dist),{
            				x:pos*spacing,
            				scaleY:0.6,
            				scaleX:1.1,
            				ease:Elastic.easeOut,
            				easeParams:[1.01,0.5]
            			});
            			TweenMax.to($cur,.8,{
            				delay:(0.2*(dist))-0.1,
            				scale:0.6,
            				ease:Elastic.easeOut,
            				easeParams:[1.1,0.6]
            			})

            			TweenMax.fromTo($cur.children(".WD__modal__share__icon"),0.2,{
            				scale:0
            			},{
            				delay:(0.2*dist)-0.1,
            				scale:1,
            				ease:Quad.easeInOut
            			})
            		})
                    $shareContainer.addClass("WD__modal__share--active");
            	}
            	function closeShareMenu(){
            		TweenMax.to([$toggleButton,$toggleButton.children(".WD__modal__share__icon")],1.4,{
            			delay:0.1,
            			scale:1,
            			ease:Elastic.easeOut,
            			easeParams:[1.1,0.3]
            		});
            		$shareButtons.each(function(i){
            			var $cur=$(this);
            			var pos=i-buttonsMid;
            			if(pos>=0) pos+=1;
            			var dist=Math.abs(pos);
            			$cur.css({
            				zIndex:dist
            			});

            			TweenMax.to($cur,0.4+((buttonsMid-dist)*0.1),{
            				x:0,
            				scale:.95,
            				ease:Quad.easeInOut,
            			});

            			TweenMax.to($cur.children(".WD__modal__share__icon"),0.2,{
            				scale:0,
            				ease:Quad.easeIn
            			});
            		})
                    $shareContainer.removeClass("WD__modal__share--active");
            	}

            	function toggleShareMenu(){
            		menuOpen=!menuOpen

            		menuOpen?openShareMenu():closeShareMenu();
            	}
            	$toggleButton.on("mousedown",function(){
            		toggleShareMenu();
            	})

                WD.form.elem.find(".WD__modal__sendReview__button").on("click", function(){
                    WD.form.elem.addClass("WD__modal__sendReview--showAuth");
                    _.onEndTransition(WD.form.share[0], function(){
                        toggleShareMenu();
                    });
                });
            },

            open: function(){

                if (WD.active){
                    WD.wrapper.addClass("WD__modal__wrapper--hide");
                }
                else {
                    WD.elem.addClass("WD__modal--open");
                    WD.elem.on("click.closeSendReview", function(e){
                        var attr = e.target.getAttribute("class");

                        if (attr && attr.match(/WD__modal--open/) && WD.form.active){
                            WD.form.close();
                        }
                    })
                }

                WD.form.elem.addClass("WD__modal__sendReview--open");

                setTimeout(function(){
                    WD.form.active = true;
                    WD.wrapper.on("click.openModalWrapper", function(){
                        if (WD.form.active) WD.form.close();
                    });
                }, 20);
            },

            close: function(){

                if (WD.active){
                    WD.wrapper.removeClass("WD__modal__wrapper--hide");
                }
                else {
                    WD.elem.removeClass("WD__modal--open");
                }
                WD.form.elem.addClass("WD__modal__sendReview--hide");
                _.onEndAnimation(WD.form.elem[0], function(){
                    WD.form.elem
                    .removeClass("WD__modal__sendReview--open WD__modal__sendReview--hide");
                });
                WD.wrapper.off("click.openModalWrapper");
                WD.form.active = false;
            }
        },

        open: function(){

            WD.wrapper.addClass("WD__modal__wrapper--open");
            WD.elem.addClass("WD__modal--open");
            WD.active = true;
        },

        close: function(){

            WD.elem.removeClass("WD__modal--open");
            _.onEndTransition(WD.elem[0], function(){
                WD.wrapper.removeClass("WD__modal__wrapper--open");
            });
            WD.active = false;
        }

    };

    var WD = yuapApp.reviews.modal;

})(Zepto, yuapApp.$dom, yuapApp.utils);
