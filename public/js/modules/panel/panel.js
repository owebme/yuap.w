(function($, $dom, _){

    yuapApp.define("panel");

    var API = yuapApp.api;

    yuapApp.panel = {

        init: function(){

            WD.elem = _.template("panel");
            WD.wrapper = WD.elem.find(".WD__panel__wrapper");
            WD.socialPanel = WD.elem.find(".WD__panel__social");
            WD.socialButtons = WD.socialPanel.find(".WD__panel__social__button:not(.WD__panel__social__button--show)");

            WD.render();
            WD.products.init();
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

            // Open contacts
            WD.wrapper.find(".WD__panel__button__map").on("click", function(e){
                API.contacts.open();
            });
        },

        popup: {

            hover: null,

            init: function(){

                WD.elem.find(".WD__panel__showPopup").on("mouseenter mouseleave", function(e){
                    var $elem = $(this),
                        $popup = WD.wrapper.find($elem.data("popup"));

                    WD.popup.hover = null;

                    if (e.type === "mouseover"){

                        WD.popup.hover = false;

                        $popup
                        .css("left", ($elem.offset().left - 6 + $elem.width() / 2 - WD.wrapper.offset().left - $popup.width() / 2) + "px")
                        .addClass("WD__panel__popup--active");

                        $popup.on("mouseenter mouseleave", function(e){
                            if (e.type === "mouseover") WD.popup.hover = true;
                            else {
                                WD.popup.hide($popup);
                            }
                        });
                    }
                    else {
                        setTimeout(function(){
                            if (!WD.popup.hover) {
                                WD.popup.hide($popup);
                            }
                        }, 10);
                    }
                });
            },

            hide: function($popup){

                $popup.removeClass("WD__panel__popup--active");
                $popup.off();
            }
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
