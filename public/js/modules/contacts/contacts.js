(function($, $dom, _){

    yuapApp.define("contacts");

    var App = yuapApp,
        API = App.api,
        prefixed = App.prefixed;

    yuapApp.contacts = {

        active: false,

        fullscreen: false,

        init: function(){

            WD.elem = _.template("contacts");
            WD.wrapper = WD.elem.find(".WD__contacts__wrapper");
            WD.container = WD.wrapper.find(".WD__contacts__container");
            WD.svg = WD.container.find(".WD__contacts__svg");
            WD.content = WD.container.find(".WD__contacts__content");
            WD.closeButton = WD.elem.find(".WD__contacts__close");
            WD.contentBox = WD.content.find(".WD__contacts__content__box");
            WD.contentDetails = WD.contentBox.find(".WD__contacts__details__container");
            WD.contentDetailsLink = WD.contentBox.find(".WD__contacts__openDetails");
            WD.buttonFullScreen = WD.wrapper.find(".WD__contacts__button__fullscreen");
            WD.buttonFeedback = WD.contentBox.find(".WD__contacts__button__feedback");
            WD.buttonBusinessCard = WD.container.find(".WD__contacts__button__businessCard");

            WD.feedback.init();
            WD.eCard.init();

            WD.render();
        },

        render: function(){

            // Open details contacts
            WD.contentDetailsLink.on("click", function(e){
                e.preventDefault();
                if (WD.contentDetailsLink.hasClass("WD__contacts__openDetails--active")){
                    WD.contentDetailsLink.removeClass("WD__contacts__openDetails--active");
                    WD.contentBox.css({
                        [prefixed["transform"]]: "translate3d(0, 0, 0)",
                        "height": WD.contentBox.data("height") + "px"
                    });
                    WD.contentDetails.removeClass("WD__contacts__details--open");
                }
                else {
                    WD.contentDetailsLink.addClass("WD__contacts__openDetails--active");
                    WD.contentBox.css({
                        [prefixed["transform"]]: "translate3d(0, -120px, 0)",
                        "height": "680px"
                    });
                    WD.contentDetails.addClass("WD__contacts__details--open");
                }
            });

            // Open fullscreen map
            WD.buttonFullScreen.on("click", function(e){
                e.preventDefault();
                if (WD.buttonFullScreen.hasClass("WD__contacts__button__fullscreen--active")){
                    WD.buttonFullScreen.removeClass("WD__contacts__button__fullscreen--active");
                    WD.elem.removeClass("WD__contacts--fullscreen");
                    WD.fullscreen = false;
                }
                else {
                    WD.buttonFullScreen.addClass("WD__contacts__button__fullscreen--active");
                    WD.elem.addClass("WD__contacts--fullscreen");
                    WD.fullscreen = true;
                }
            });

            // Open Feedback sidebar
            WD.buttonFeedback.on("click", function(e){
                WD.feedback.open();
            });

            // Open Business card
            WD.buttonBusinessCard.on("click", function(e){
                API.eCard.open();
            });

            // Close section Contacts
            WD.closeButton.on("click", function(){
                WD.close();
            });
        },

        move: {

            init: function(){

                $(document).on("mousemove.moveContacts", function(e){
                    var screen = App.sizes.width * 0.75,
                        half = App.sizes.width * 0.5,
                        fourth = App.sizes.width * 0.25,
                        x1 = e.pageX * 0.2,
                        x2 = e.pageX * 0.15,
                        s = e.pageX < screen ? ((screen - e.pageX) / screen) * 10 : 0,
                        left = e.pageX < screen ? ((screen - e.pageX) / screen) * 310 : 1;

                    if (e.pageX > screen || WD.fullscreen || WD.feedback.active || WD.eCard.active) return;

                    x1 *= ((screen - e.pageX) / screen) * 2;

                    if (e.pageX < screen && e.pageX > half) {
                        var delta = (screen - e.pageX) / fourth;
                        s *= delta;
                    }

                    if (x2 < 60) return;

                    var animHover = function(){
                        WD.svg[0].setAttribute("d", "m" + s + ",0 a0,0,0,0,0,30,0 a0,0,0,0,0,0,40 a0,0,0,0,0,-30,0 a" + x1 + "," + x2 + ",0,0,0,0,-40 z");
                        WD.content[0].style[prefixed["transform"]] = "translate3d(" + left + "px, 0, 0)";
                    };

                    _.raf(animHover);
                    animHover();
                });
            },

            destroy: function(){

                $(document).off("mousemove.moveContacts");
            }
        },

        open: function(){

            WD.elem.addClass("WD__contacts--open");
            WD.active = true;

            _.onEndTransition(WD.wrapper[0], function(){
                //WD.move.init();
                if (!WD.contentBox.data("height")){
                    WD.contentBoxHeight = WD.contentBox.height();
                    WD.contentBox.css("height", WD.contentBoxHeight + "px").data("height", WD.contentBoxHeight);
                }
            });

            $dom.html.on("keyup.contacts", function(e){
                if (e.which == "27"
                && !WD.feedback.active
                && !WD.eCard.active) WD.close();
            });
        },

        close: function(){

            WD.move.destroy();
            WD.elem.removeClass("WD__contacts--open");
            $dom.html.off("keyup.contacts");
            WD.active = false;
        }

    };

    var WD = yuapApp.contacts;

})(Zepto, yuapApp.$dom, yuapApp.utils);
