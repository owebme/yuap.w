(function($, $dom, _){

    yuapApp.define("messenger");

    var App = yuapApp;

    yuapApp.messenger = {

		active: false,

		fixed: false,

		expanded: false,

        init: function(){

			WD.elem = _.template("messenger");
			WD.blob = WD.elem.find(".WD__messenger__blob");
			WD.blobPath = WD.blob.find(".WD__messenger__blob__path");
			WD.wrapper = WD.elem.find(".WD__messenger__wrapper");
			WD.header = WD.wrapper.find(".WD__messenger__header");
			WD.content = WD.wrapper.find(".WD__messenger__content");
			WD.buttonFixed = WD.header.find(".WD__messenger__header__button__fixed");

			WD.move.init();
			//WD.move.hover.init();
			WD.viewer.init();
			WD.render();
		},

		render: function(){

			WD.buttonFixed.on("click", function(){
				if (WD.buttonFixed.hasClass("WD__messenger__header__button__fixed--active")){
					WD.fixedOff();
				}
				else {
					WD.fixedOn();
				}
			});
		},

		fixedOn: function(){
			WD.fixed = true;
			WD.buttonFixed.addClass("WD__messenger__header__button__fixed--active");
			WD.move.hover.destroy();
		},

		fixedOff: function(){
			WD.fixed = false;
			WD.buttonFixed.removeClass("WD__messenger__header__button__fixed--active");
			WD.move.hover.init();
		}
	};

    var WD = yuapApp.messenger;

})(Zepto, yuapApp.$dom, yuapApp.utils);
