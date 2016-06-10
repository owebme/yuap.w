(function($, $dom, _){

    yuapApp.define("panel.products");

    var API = yuapApp.api,
        Panel = yuapApp.panel,
        prefixed = yuapApp.prefixed;

    yuapApp.panel.products = {

        sliderEvent: null,

        clickItem: true,

        slideIndex: 0,

        prevArrowShow: false,

        init: function(){

            WD.elem = _.template("products", {
                items: [
                    {
                        title: "Кожаный клип-кейс для iPhone 6S",
                        image: "http://spigen.su/media/catalog/product/cache/1/image/700x700/9df78eab33525d08d6e5fb8d27136e95/k/o/kozhanyj-klip-kejs-spigen-sgp-dlja-iphone-6-plus-leather-fit-5-5-sinij-sgp11397-3.jpg",
                        link: "#",
                        price_sale: true,
                        price1: 3790,
                        price2: 4240
                    },
                    {
                        title: "Ноутбук APPLE MacBook 12 Rose Gold",
                        image: "https://mdata.yandex.net/i?path=b0421235021_img_id670341079792497116.jpeg",
                        link: "#",
                        price_sale: false,
                        price1: 105999
                    },
                    {
                        title: "LED телевизор LG 28LF491U",
                        image: "http://static.eldorado.ru/photos/71/new_71121630_l_360.jpeg/resize/500x375/",
                        link: "#",
                        price_sale: true,
                        price1: 18880,
                        price2: 24180
                    },
                    {
                        title: "Музыкальный центр PHILIPS FX15/12",
                        image: "http://static.eldorado.ru/photos/71/new_71101983_l_712.jpeg/resize/500x375/",
                        link: "#",
                        price_sale: true,
                        price1: 7999,
                        price2: 8399
                    },
                    {
                        title: "Samsung Galaxy J7 (2016)",
                        image: "https://mdata.yandex.net/i?path=b0420222501_img_id6661848868494336414.jpeg",
                        link: "#",
                        price_sale: true,
                        price1: 19990,
                        price2: 22490
                    },
                    {
                        title: "Подставка Twelve South BookArc для MacBook",
                        image: "http://store.storeimages.cdn-apple.com/4662/as-images.apple.com/is/image/AppleInc/aos/published/images/H/JB/HJB32/HJB32?wid=1144&hei=1144&fmt=jpeg&qlt=95&op_sharpen=0&resMode=bicub&op_usm=0.5%2C0.5%2C0%2C0&iccEmbed=0&layer=comp&.v=k9zkZ3",
                        link: "#",
                        price_sale: false,
                        price1: 4890
                    },
                    {
                        title: "Mонитор Apple Thunderbolt Display (27-дюймовый)",
                        image: "http://store.storeimages.cdn-apple.com/4662/as-images.apple.com/is/image/AppleInc/aos/published/images/M/C9/MC914/MC914_AV6?wid=1144&hei=1144&fmt=jpeg&qlt=80&op_sharpen=0&resMode=bicub&op_usm=0.5%2C0.5%2C0%2C0&iccEmbed=0&layer=comp&.v=Nv2lR0",
                        link: "#",
                        price_sale: true,
                        price1: 85990,
                        price2: 94490
                    }
                ],
                title_wrap: function(){
                    return function(text, render){
                        return render(text).replace(/^(.+?)\s/, '<span class="WD__products__item__title__strong">$1</span> ');
                    }
                },
                price_wrap: function(){
                    return function(text, render){
                        return render(text).replace(/(\d)(?=((\d{3})+)(\D|$))/, "$1 ") + " Р";
                    }
                }
            });
            // <span class="WD__products__item__title__strong">Мультиварка</span>
            WD.wrapper = WD.elem.find(".WD__products__wrapper");
            WD.popupZone = WD.wrapper.find(".WD__products__hoverZone");
            WD.overlay = $('<div class="WD__products__overlay"><div class="WD__section__close WD__section__close--center"></div></div>').appendTo($dom.body);
            WD.slider = WD.elem.find(".WD__products__slider");
            WD.prevArrow = WD.elem.find(".WD__products__arrow__prev");
            WD.menuOverlay = $('<div class="WD__panel__popup__overlay"></div>').appendTo($dom.body);

            WD.render();
        },

        render: function(){

            setTimeout(function(){
                WD.slider.initSlider();
                WD.slider.on('changeActiveIndex', function(e) {
                    var index = WD.slider.getActiveIndex();
                    if (index > 1) WD.slideIndex = index;
                });
            }, 5);


            WD.resize();
            WD.hover();
            WD.popup.init();

            WD.slider.on("mousedown mouseup mousemove", function(e){
                if (e.type === "mousemove" && WD.sliderEvent === "mousedown"){
                    WD.clickItem = false;
                }
                else if (e.type === "mouseup" && WD.sliderEvent === "mousedown"){
                    WD.clickItem = true;
                }
                if (e.type === "mousemove"){
                    if (!WD.prevArrowShow && e.clientX < 350 && WD.slideIndex > 1){
                        WD.prevArrowShow = true;
                        WD.prevArrow.addClass("WD__products__arrow--active");
                    }
                    else if (WD.prevArrowShow && e.clientX > 349){
                        WD.prevArrowShow = false;
                        WD.prevArrow.removeClass("WD__products__arrow--active");
                    }
                }
                WD.sliderEvent = e.type;
            });

            // open Slider
            $(".WD__products__minify__button__slider").on("click", function(){
                API.products.open();
            });

            // open Product
            WD.slider.on("click", ".WD__products__item__photo", function(e){
                e.preventDefault();
                if (WD.clickItem){
                    WD.slider.off("click");
                    $(e.target).trigger("click");
                    WD.close();
                }
            });

            // next Slide
            WD.elem.find(".WD__products__arrow__next").on("click", function(){
                WD.slider.nextSlide();
            });

            // prev Slide
            WD.prevArrow.on("click", function(){
                WD.slider.prevSlide();
            });

            // close Slider
            WD.overlay.find(".WD__section__close").on("click", function(){
                WD.close();
            });
        },

        resize: function(){

            var left = parseInt(Panel.wrapper.offset().left) + 244;
            WD.wrapper.attr("style", "margin-left:" + left + "px; width:calc(100% - " + left + ")");
        },

        popup: {

            hover: null,

            hoverSlider: false,

            init: function(){

                WD.popup.elem = Panel.elem.find(".WD__panel__popup__menu");

                Panel.elem.find(".WD__panel__button__menu").on("mouseenter mouseleave", function(e){
                    var $elem = $(this);

                    WD.popup.hover = null;

                    if (e.type === "mouseover"){

                        WD.popup.hover = false;

                        WD.popup.elem
                        .css("left", ($elem.offset().left - 6 + $elem.width() / 2 - Panel.wrapper.offset().left - WD.popup.elem.width() / 2) + "px")
                        .addClass("WD__panel__popup--active");

                        WD.menuOverlay.addClass("WD__panel__popup__overlay--active");
                        WD.elem.addClass("WD__products--active");

                        WD.wrapper.on("mouseenter mouseleave", function(e){
                            if (e.type === "mouseover") WD.popup.hover = true;
                            else {
                                WD.popup.hide();
                            }
                        });
                    }
                    else {
                        setTimeout(function(){
                            if (!WD.popup.hover) {
                                WD.popup.hide();
                            }
                        }, 100);
                    }
                });
            },

            hide: function(){

                setTimeout(function(){
                    setTimeout(function(){
                        WD.popup.elem.removeClass("WD__panel__popup--active");
                        WD.wrapper.off();

                        WD.menuOverlay.removeClass("WD__panel__popup__overlay--active");
                        if (WD.popup.hoverSlider) return true;
                        WD.elem.removeClass("WD__products--active");
                    }, WD.popup.hoverSlider ? 100 : 0);
                }, 0);
            }
        },

        hover: function(){

            WD.popupZone.on("mouseenter.popupProducts", function(){
                WD.popupZone.off("mouseenter.popupProducts");
                WD.popup.hoverSlider = true;
                WD.popup.hide();
                WD.elem.addClass("WD__products--show");
                _.onEndTransition(WD.overlay[0], function(){
                    WD.slider.reloadSlider();
                    WD.nav();
                });
            });
        },

        nav: function(){

            $dom.document.on("keyup.productsSlider", function(e){
                switch(e.which) {
                    case 37:
                        WD.slider.prevSlide();
                    break;
                    case 39:
                        WD.slider.nextSlide();
                    break;
                    case 27:
                        WD.close();
                    break;
                }
            });
        },

        open: function(){

            if (WD.slideIndex) WD.slider.gotoSlide(WD.slideIndex + 1);
            WD.popupZone.off("mouseenter.popupProducts");
            WD.elem.addClass("WD__products--open");
            WD.slider.reloadSlider();
            WD.nav();
        },

        close: function(){

            WD.popup.hoverSlider = false;
            WD.elem.addClass("WD__products--hide");
            _.onEndTransition(WD.elem[0], function(){
                WD.elem.attr("class", "WD__products");
                WD.slider.gotoSlide(1);
                setTimeout(function(){
                    WD.slider.css(prefixed["transform"], "translate3d(0, 0, 0)");
                    WD.hover();
                }, 400);
            });

            $dom.document.off("keyup.productsSlider");
        }
    };

    var WD = yuapApp.panel.products;

})(Zepto, yuapApp.$dom, yuapApp.utils);
