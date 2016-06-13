(function($, $dom, _){

    yuapApp.define("contacts.eCard");

    var Contacts = yuapApp.contacts;

    yuapApp.contacts.eCard = {

        active: false,

        init: function(){

            WD.elem = _.template("businessCard");
            WD.closeButton = WD.elem.find(".WD__businessCard__close");

            WD.render();
        },

        render: function(){


        },

        open: function(){

            WD.elem.addClass("WD__businessCard--open");
            WD.active = true;
        },

        close: function(){

            WD.elem.removelass("WD__businessCard--open");
            WD.active = false;
        }

    };

    var WD = yuapApp.contacts.eCard;

})(Zepto, yuapApp.$dom, yuapApp.utils);
