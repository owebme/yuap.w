(function($, $dom, _){

    yuapApp.define("reviews");

    yuapApp.reviews = {

        init: function(){

            WD.elem = _.template("reviews");

            WD.render();
        },

        render: function(){

            tinyscrollbar(document.getElementById("WD__reviews__scrollbar"));

        }

    };

    var WD = yuapApp.reviews;

})(Zepto, yuapApp.$dom, yuapApp.utils);
