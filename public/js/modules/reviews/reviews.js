(function($, $dom, _){

    yuapApp.define("reviews");

    yuapApp.reviews = {

        active: false,

        init: function(){

            WD.elem = _.template("reviews");
            WD.closeButton = WD.elem.find(".WD__section__close");

            yuapApp.reviews.modal.init();

            WD.render();
        },

        render: function(){

            tinyscrollbar(document.getElementById("WD__reviews__scrollbar"));

            WD.elem.on("click", ".WD__reviews__item__content", function(){
                WD.modal.open();
            });

            WD.elem.find(".WD__reviews__button").on("click", function(){
                WD.modal.form.open();
            });

            WD.closeButton.on("click", function(){
                WD.close();
            });
        },

        open: function(){

            WD.elem.addClass("WD__section--open");
            WD.active = true;

            $dom.html.on("keyup.reviews", function(e){
                if (e.which == "27") WD.close();
            });
        },

        close: function(){

            WD.elem.removeClass("WD__section--open");
            $dom.html.off("keyup.reviews");
            WD.active = false;
        }

    };

    var WD = yuapApp.reviews;

})(Zepto, yuapApp.$dom, yuapApp.utils);
