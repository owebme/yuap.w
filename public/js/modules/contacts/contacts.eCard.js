(function($, $dom, _){

    yuapApp.define("contacts.eCard");

    var Contacts = yuapApp.contacts;

    yuapApp.contacts.eCard = {

        active: false,

        init: function(){

            WD.elem = _.template("businessCard");
            WD.form = WD.elem.find(".WD__businessCard__form");
            WD.closeButton = WD.elem.find(".WD__businessCard__close");

            WD.render();
        },

        render: function(){

            WD.parallaxIcon = new Parallax(WD.form[0]);

            setTimeout(function(){
                WD.parallaxIcon.disable();
            }, 500);

            WD.closeButton.on("click", function(){
                WD.close();
            });
        },

        open: function(){

            if (Contacts.active){
                Contacts.buttonBusinessCard
                .addClass("WD__contacts__button__businessCard--active");
            }
            WD.elem.addClass("WD__businessCard--open");

            WD.parallaxIcon.enable();

            WD.active = true;

            $dom.html.on("keyup.eCard", function(e){
                if (e.which == "27") WD.close();
            });
        },

        close: function(){

            WD.elem.addClass("WD__businessCard--close")
            .removeClass("WD__businessCard--open");
            _.onEndTransition(WD.elem[0], function(){
                if (Contacts.active){
                    Contacts.buttonBusinessCard
                    .removeClass("WD__contacts__button__businessCard--active");
                }
                WD.elem.removeClass("WD__businessCard--close");
                WD.parallaxIcon.disable();
            });

            $dom.html.off("keyup.eCard");

            WD.active = false;
        }

    };

    var WD = yuapApp.contacts.eCard;

})(Zepto, yuapApp.$dom, yuapApp.utils);
