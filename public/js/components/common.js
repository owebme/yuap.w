(function($){

	/* --- Widgets interface --- */
	yuapApp.define("api");
	yuapApp.define("sizes");
	yuapApp.define("utils");
	yuapApp.define("device");
	yuapApp.define("$dom");

	/* --- Root blocks --- */
	yuapApp.$dom = {
		html: $('html'),
	    body: $('body'),
	    document: $(document),
	    window: $(window),
		frame: $("#frame"),
		wrapper: $("#WD__wrapper"),
		sidebar: $("#WD__sidebar")
	};

	/* --- Prefixed styles --- */
	yuapApp.prefixed = {
		'transform': Modernizr.prefixed('transform'),
		'transform-origin': Modernizr.prefixed('transformOrigin')
	};

})($);
