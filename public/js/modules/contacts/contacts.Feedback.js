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


        },

        open: function(){

            Contacts.elem.addClass("WD__contacts--feedback");
            WD.active = true;
        },

        close: function(){

            Contacts.elem.removelass("WD__contacts--feedback");
            WD.active = false;
        }

    };

    var WD = yuapApp.contacts.feedback;

})(Zepto, yuapApp.$dom, yuapApp.utils);
