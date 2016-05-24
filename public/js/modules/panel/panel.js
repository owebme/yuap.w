(function($, $dom, _){

    yuapApp.define("panel");

    yuapApp.panel = {

        hover: null,

        init: function(){

            WD.elem = _.template("panel");
            WD.wrapper = WD.elem.find(".WD__panel__wrapper");
            WD.socialPanel = WD.elem.find(".WD__panel__social");
            WD.socialButtons = WD.socialPanel.find(".WD__panel__social__button:not(.WD__panel__social__button--show)");

            WD.render();
        },

        render: function(){

            WD.popup();
            WD.social();
        },

        popup: function(){
            WD.elem.find(".WD__panel__showPopup").on("mouseenter mouseleave", function(e){
                var $elem = $(this),
                    $popup = WD.wrapper.find($elem.data("popup"));

                WD.hover = null;

                if (e.type === "mouseover"){

                    WD.hover = false;

                    $popup
                    .css("left", ($elem.offset().left - 6 + $elem.width() / 2 - WD.wrapper.offset().left - $popup.width() / 2) + "px")
                    .addClass("WD__panel__popup--active");

                    $popup.on("mouseenter mouseleave", function(e){
                        if (e.type === "mouseover") WD.hover = true;
                        else {
                            $popup.removeClass("WD__panel__popup--active");
                            $popup.off();
                        }
                    });
                }
                else {
                    setTimeout(function(){
                        if (!WD.hover) {
                            $popup.removeClass("WD__panel__popup--active");
                            $popup.off();
                        }
                    }, 10);
                }
            });
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