(function($, $dom, _){

    yuapApp.define("contacts");

    yuapApp.contacts = {

        active: false,

        init: function(){

            WD.elem = _.template("contacts");
            WD.closeButton = WD.elem.find(".WD__contacts__close");

            WD.feedback.init();
            WD.eCard.init();

            WD.render();
        },

        render: function(){

            WD.closeButton.on("click", function(){
                WD.close();
            });
        },

        open: function(){

            WD.elem.addClass("WD__contacts--open");
            WD.active = true;

            $dom.html.on("keyup.contacts", function(e){
                if (e.which == "27") WD.close();
            });
        },

        close: function(){

            WD.elem.removeClass("WD__contacts--open");
            $dom.html.off("keyup.contacts");
            WD.active = false;
        }

    };

    var WD = yuapApp.contacts;

})(Zepto, yuapApp.$dom, yuapApp.utils);
