(function($, $dom, _){

    yuapApp.define("panel");

    var API = yuapApp.api;

    yuapApp.panel = {

        hover: null,

        slider: false,

        init: function(){

            WD.elem = _.template("panel");
            WD.wrapper = WD.elem.find(".WD__panel__wrapper");
            WD.socialPanel = WD.elem.find(".WD__panel__social");
            WD.socialButtons = WD.socialPanel.find(".WD__panel__social__button:not(.WD__panel__social__button--show)");
            WD.menuOverlay = $('<div class="WD__panel__popup__overlay"></div>').appendTo($dom.body);
            WD.products = _.template("products");
            WD.productsOverlay = $('<div class="WD__products__overlay"><div class="WD__section__close WD__section__close--center"></div></div>').appendTo($dom.body);

            WD.render();
        },

        render: function(){

            WD.popup.init();
            WD.social();

            WD.wrapper.on("click", ".WD__panel__reviews, .WD__panel__messenger", function(e){
                e.preventDefault();
            });

            // Open reviews
            WD.wrapper.find(".WD__panel__reviews").on("click", function(e){
                API.reviews.open();
            });

            WD.products.on("mouseenter", function(){
                WD.slider = true;
                WD.products.addClass("WD__products--open");
            });
        },

        popup: {

            init: function(){

                WD.elem.find(".WD__panel__showPopup").on("mouseenter mouseleave", function(e){
                    var $elem = $(this),
                        item = $elem.data("popup"),
                        $popup = WD.wrapper.find(item);

                    WD.hover = null;

                    if (e.type === "mouseover"){

                        WD.hover = false;

                        $popup
                        .css("left", ($elem.offset().left - 6 + $elem.width() / 2 - WD.wrapper.offset().left - $popup.width() / 2) + "px")
                        .addClass("WD__panel__popup--active");

                        if (item.match(/popup__menu/)){
                            WD.menuOverlay.addClass("WD__panel__popup__overlay--active");
                            WD.products.addClass("WD__products--active");
                        }

                        $popup.on("mouseenter mouseleave", function(e){
                            if (e.type === "mouseover") WD.hover = true;
                            else {
                                WD.popup.hide(item, $popup);
                            }
                        });
                    }
                    else {
                        setTimeout(function(){
                            if (!WD.hover) {
                                WD.popup.hide(item, $popup);
                            }
                        }, 10);
                    }
                });
            },

            hide: function(item, $popup){

                setTimeout(function(){
                    setTimeout(function(){
                        $popup.removeClass("WD__panel__popup--active");
                        $popup.off();

                        if (item.match(/popup__menu/)){
                            WD.menuOverlay.removeClass("WD__panel__popup__overlay--active");
                            if (WD.slider) return true;
                            WD.products.removeClass("WD__products--active");
                        }
                    }, WD.slider ? 250 : 0);
                }, 5);
            }
        },

        menu: function(){

            // WD.menuPopup = WD.elem.find(".WD__panel__popup__menu");
            //
            // WD.elem.find(".WD__panel__menu__button").on("mouseenter mouseleave", function(e){
            //
            // });
        },

        social: function(){

            WD.socialPanel.find(".WD__panel__social__more").on("click", function(e){
                $(this).removeClass("WD__panel__social__button--show");
                WD.socialButtons.addClass("WD__panel__social__button--show");
            });
        }

    };

    var WD = yuapApp.panel;

})(Zepto, yuapApp.$dom, yuapApp.utils);
