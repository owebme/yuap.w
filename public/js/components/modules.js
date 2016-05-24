(function(sizes, $dom){
	// {fn} update sizes
	var updateSizes = function(){
		sizes.width = $dom.window.width();
		sizes.height = parseInt(window.innerHeight,10);
	};
	// {event} window resize
	$dom.window.on('resize.yuapApp', updateSizes);
	// init
	updateSizes();
})(yuapApp.sizes, yuapApp.$dom);

(function(device, $dom){

	/* --- Mobile --- */
	device.support = Modernizr;

	/* --- Retina --- */
	device.isRetina = (window.devicePixelRatio && window.devicePixelRatio>1);
	$dom.html.addClass(device.isRetina ? 'd-retina' : 'd-no-retina');

	/* --- Safari --- */
	device.isSafari = /constructor/i.test(window.HTMLElement);
	$dom.html.addClass(device.isSafari ? 'd-safari' : 'd-no-safari');

	/* --- Firefox --- */
	device.isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
	$dom.html.addClass(device.isFirefox ? 'd-firefox' : 'd-no-firefox');

})(yuapApp.device, yuapApp.$dom);
