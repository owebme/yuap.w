(function($, $dom, _){

    yuapApp.define("alert");

    yuapApp.alert = {

        callSuccess: function(){},

        callCancel: function(){},

        options: {},

        init: function(){

            WD.elem = _.template("alert");
            WD.wrapper = WD.elem.find(".WD__alert__wrapper");
            WD.container = WD.wrapper.find(".WD__alert__container");
            WD.title = WD.container.find(".WD__alert__title");
            WD.buttons = WD.wrapper.find(".WD__alert__buttons");
            WD.success = WD.container.find(".WD__alert__button__success");
            WD.cancel = WD.container.find(".WD__alert__button__cancel");

            WD.render();
        },

        render: function(){

            WD.success.on("click", function(){
                WD.close();
                WD.callSuccess();
            });

            WD.cancel.on("click", function(){
                WD.close();
                WD.callCancel();
            });
        },

        open: function(options){

            if (options) {
                if (options.title) WD.title.text(options.title);
                if (options.one) {
                    WD.buttons.addClass("WD__alert__buttons--one");
                    WD.success.text(options.one === true ? "OK" : options.one);
                }
                WD.options = options;
            }
            else {
                WD.options = {};
            }

            WD.elem.addClass("WD__alert--active WD__alert--anim");

            _.onEndAnimation(WD.container[0], function(){
                WD.elem.removeClass("WD__alert--anim");
            });

            if (options && typeof options.success === "function") {
                WD.callSuccess = options.success;
            }
            if (options && typeof options.cancel === "function") {
                WD.callCancel = options.cancel;
            }
        },

        close: function(){

            WD.elem.removeClass("WD__alert--active");

            _.onEndTransition(WD.wrapper[0], function(){
                if (WD.options.title) WD.title.text("Сообщение");
                if (WD.options.one){
                    WD.buttons.removeClass("WD__alert__buttons--one");
                    WD.success.text("Ok");
                }
                WD.callSuccess = function(){};
                WD.callCancel = function(){};
            });

        }
    };

    var WD = yuapApp.alert;

})(Zepto, yuapApp.$dom, yuapApp.utils);
