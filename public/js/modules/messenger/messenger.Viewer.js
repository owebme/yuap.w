(function($, $dom, _){

    yuapApp.define("messenger.viewer");

    var App = yuapApp,
        Messenger = App.messenger,
        prefixed = yuapApp.prefixed;

    yuapApp.messenger.viewer = {

        active: false,

        init: function(){

            WD.elem = $('<div class="WD__messenger__viewer">'+
                '<div class="WD__messenger__viewer__overlay"></div>'+
                '<img src="" class="WD__messenger__viewer__image"></div>'+
            '</div>').appendTo($dom.wrapper);

			WD.image = WD.elem.find(".WD__messenger__viewer__image");

            WD.render();
		},

        render: function(){

            // Zoom in Image
            Messenger.content.on("click", ".WD__messenger__item__image", function(){
                var $item = $(this),
                    $img = $item.children(),
                    width = parseInt($img[0].offsetWidth) - 2,
                    height = parseInt($img[0].offsetHeight) - 2,
                    orgWidth = parseInt($img[0].naturalWidth),
                    orgHeight = parseInt($img[0].naturalHeight),
                    top = parseInt($img.offset().top),
                    left = parseInt($img.offset().left),
                    image = $img[0].getAttribute("src"),
                    delta = 0,
                    scale = 0,
                    scaleTop = 0,
                    scaleLeft = 0,
                    imgWidth = 0,
                    imgHeight = 0,
                    imgTop = 0,
                    imgLeft = 0;

                if (orgWidth > orgHeight && orgWidth > App.sizes.width - 40) {
                    delta = height / width;
                    imgWidth = App.sizes.width - 40;
                    imgHeight = imgWidth * delta;
                    imgTop = (App.sizes.height - imgHeight) / 2;
                    imgLeft = 20;
                }
                else {
                    if (orgHeight > App.sizes.height - 40){
                        delta = width / height;
                        imgHeight = App.sizes.height - 40;
                        imgWidth = imgHeight * delta;
                        imgLeft = (App.sizes.width - imgWidth) / 2;
                        imgTop = 20;
                    }
                    else {
                        imgWidth = orgWidth;
                        imgHeight = orgHeight;
                        imgTop = (App.sizes.height - imgHeight) / 2;
                        imgLeft = (App.sizes.width - imgWidth) / 2;
                    }
                }

                scale = height / imgHeight;
                scaleTop = top - imgTop + 1 - (imgHeight - imgHeight * scale) / 2;
                scaleLeft = left - imgLeft + 1 - (imgWidth - imgWidth * scale) / 2;

                WD.image[0].setAttribute("src", image);

                WD.image.css({
                    width: imgWidth,
                    height: imgHeight,
                    top: imgTop + "px",
                    left: imgLeft + "px"
                });

                WD.image[0].style[prefixed["transform"]] = "translate3d(" + scaleLeft + "px, " + scaleTop + "px, 0) scale(" + scale + ", " + scale + ")";

                WD.image.data("cords", {
                    item: $item,
                    scaleLeft: scaleLeft,
                    scaleTop: scaleTop,
                    scale: scale
                });

                _.onLoadImage(image, function(){
                    setTimeout(function(){
                        WD.elem.addClass("WD__messenger__viewer--active");
                        $item.addClass("WD__messenger__item__image--active");
                        WD.image[0].style[prefixed["transform"]] = "translate3d(0, 0, 0) scale(1)";
                    }, 20);
                });

                WD.active = true;
            });

            // Zoom out Image
            WD.elem.on("click", function(){

                var cords = WD.image.data("cords");

                WD.image[0].style[prefixed["transform"]] = "translate3d(" + cords.scaleLeft + "px, " + cords.scaleTop + "px, 0) scale(" + cords.scale + ")";

                WD.elem.removeClass("WD__messenger__viewer--active");

                _.onEndTransition(WD.image[0], function(){
                    cords.item.removeClass("WD__messenger__item__image--active");
                    WD.active = false;
                });
            });
        }
	};

    var WD = yuapApp.messenger.viewer;

})(Zepto, yuapApp.$dom, yuapApp.utils);
