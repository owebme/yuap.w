/* --- App interface --- */
var app = {
	sizes: {},
	utils: {},
	plugins: {},
	device: {}
};

/* --- Root blocks --- */
app.$dom = {
	html: $('html'),
	body: $('body'),
	document: $(document),
	window: $(window)
};

var $io = null,
	$user = null,
	$sid = null,
	$apiUri = '/api/',
	$root = null,
	Control = null;

var $$ = window.Zepto || window.jQuery;

tempus.lang('ru');

/* --- Templates widgets --- */
if (yuapApp && yuapApp.templates){
	app.widgets = yuapApp.templates;
}

/* --- Prefixed styles --- */
var prefixed = {
	'transform': Modernizr.prefixed('transform'),
	'transform-origin': Modernizr.prefixed('transformOrigin')
};
