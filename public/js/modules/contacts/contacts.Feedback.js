(function($, $dom, _){

    yuapApp.define("contacts.feedback");

    var Contacts = yuapApp.contacts;

    yuapApp.contacts.feedback = {

        active: false,

        init: function(){

            WD.elem = Contacts.elem.find(".WD__feedback");
            WD.closeButton = WD.elem.find(".WD__feedback__close");

            WD.render();
        },

        render: function(){

            WD.elem.on("click", ".WD__feedback__field", function(e){
                var $elem = $(e.currentTarget);

                if (!$elem.hasClass("WD__feedback__field--focused")){
                    $elem.addClass("WD__feedback__field--focused");
                }
                $elem.find("input").focus();
            });

            WD.closeButton.on("click", function(){
                WD.close();
            });
        },

        open: function(){

            Contacts.elem.addClass("WD__contacts__wrapper--slideLeft WD__contacts--feedback");
            WD.active = true;

            _.onEndTransition(Contacts.wrapper[0], function(){
                Contacts.wrapper.on("click.closeFeedback", function(e){
                    WD.close();
                });
            });

            $dom.html.on("keyup.feedback", function(e){
                if (e.which == "27") WD.close();
            });
        },

        close: function(){

            Contacts.wrapper.off("click.closeFeedback");
            Contacts.elem.removeClass("WD__contacts--feedback");
            _.onEndTransition(Contacts.wrapper[0], function(){
                Contacts.elem.removeClass("WD__contacts__wrapper--slideLeft");
            });
            $dom.html.off("keyup.feedback");
            WD.active = false;
        }

    };

    var WD = yuapApp.contacts.feedback;

})(Zepto, yuapApp.$dom, yuapApp.utils);
