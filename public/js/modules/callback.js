(function($, $dom, _){

    yuapApp.define("callback");

    var App = yuapApp;

    yuapApp.callback = {

        start: false,

        number: "",

        showPhone: false,

        init: function(){

            WD.elem = _.template("callback");
            WD.wrapper = WD.elem.find(".WD__section__wrapper");
            WD.form = WD.elem.find(".WD__callback__form");
            WD.notify = WD.elem.find(".WD__notify");
            WD.textNumber = WD.elem.find(".WD__callback__message__footer");
            WD.line = WD.elem.find(".WD__callback__message__line");
            WD.title = WD.form.find(".WD__callback__title");
            WD.input = WD.form.find(".WD__callback__form__input");
            WD.phone = WD.elem.find(".WD__callback__phone__number__text");
            WD.phoneButton = WD.elem.find(".WD__callback__button");
            WD.closeButton = WD.elem.find(".WD__section__close");

            WD.render();
        },

        render: function(){

            WD.wrapper.on("click", function(){
                if (WD.showPhone) WD.hidePhone();
            });

            WD.closeButton.on("click", function(){
                WD.close();
            });

            WD.parallaxNotify = new Parallax(WD.notify[0]);
            WD.parallaxKeyboard = new Parallax(WD.form[0]);

            setTimeout(function(){
                WD.parallaxNotify.disable();
                WD.parallaxKeyboard.disable();
            }, 500);

            WD.keyboard();
            WD.button();
        },

        open: function(){

            WD.elem
            .addClass("WD__section--open")
            .addClass("WD__callback--start");

            WD.parallaxNotify.enable();
            WD.parallaxKeyboard.enable();

            _.onEndAnimation(WD.closeButton[0], function(){

                WD.notify.addClass("WD__notify--active");

                WD.input.focus();

                WD.elem.on("mouseover click", function(){
                    WD.input.focus();
                });

                if (!WD.start){
                    WD.start = true;
                    WD.title.addClass("WD__callback__title--anim");
                }

                $dom.frame.addClass("unBlur");
            });
        },

        keyboard: function(){

            WD.form.on("click", ".WD__callback__keyboard__item", function(){
                var num = $(this).data("number");
                WD.clickNumber(num);
            });

            WD.form.find(".WD__callback__keyboard__button__backspace").on("click", function(){
                WD.clickNumber("-");
            });

            WD.form.find(".WD__callback__keyboard__button__call").on("click", function(){
                if (WD.number.length === 10) {
                    WD.confirmPhone();
                }
                else {
                    App.alert.open({
                        title: "Введите свой номер из 10 цифр",
                        one: true
                    });
                }
            });

            WD.elem.on("keyup", function(e){
                switch(e.which) {
                    case 48:
                        WD.animNumber(0);
                        WD.clickNumber(0);
                    break;
                    case 49:
                        WD.animNumber(1);
                        WD.clickNumber(1);
                    break;
                    case 50:
                        WD.animNumber(2);
                        WD.clickNumber(2);
                    break;
                    case 51:
                        WD.animNumber(3);
                        WD.clickNumber(3);
                    break;
                    case 52:
                        WD.animNumber(4);
                        WD.clickNumber(4);
                    break;
                    case 53:
                        WD.animNumber(5);
                        WD.clickNumber(5);
                    break;
                    case 54:
                        WD.animNumber(6);
                        WD.clickNumber(6);
                    break;
                    case 55:
                        WD.animNumber(7);
                        WD.clickNumber(7);
                    break;
                    case 56:
                        WD.animNumber(8);
                        WD.clickNumber(8);
                    break;
                    case 57:
                        WD.animNumber(9);
                        WD.clickNumber(9);
                    break;
                    case 8:
                        WD.clickNumber("-");
                    break;
                    case 27:
                        WD.close();
                    break;
                }
            });

        },

        animNumber: function(num){

            var $button = WD.elem
            .find('.WD__callback__keyboard__item[data-number="'+ num +'"]');

            $button.addClass("WD__callback__keyboard__item--active");

            setTimeout(function(){
                $button.removeClass("WD__callback__keyboard__item--active");
            }, 150);
        },

        clickNumber: function(num){

            if (num > -1){
                if (WD.number.length === 10) return;
                WD.number += "" + num;
            }
            else if (num === "-" && WD.number.length > 0){
                if (WD.showPhone){
                    WD.hidePhone();
                    return;
                }
                WD.number = WD.number.substr(0, WD.number.length - 1);
            }
            if (WD.number.length > 0){
                WD.title
                .text(WD.number)
                .addClass("WD__callback__title--number");
                WD.textNumber
                .text("осталось " + (10 - WD.number.length) + " цифр")
                .addClass("WD__callback__message__footer--active");
                WD.line.css("width", (WD.number.length * 10) + "%");
            }
            else {
                WD.title
                .text(WD.title.data("text"))
                .removeClass("WD__callback__title--number");
                WD.textNumber
                .removeClass("WD__callback__message__footer--active");
                WD.line.css("width", "0%");
            }

            if (WD.number.length === 10) {
                WD.confirmPhone();
            }
        },

        confirmPhone: function(){
            WD.phone.text(String(WD.number).replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4"));
            WD.elem.addClass("WD__callback--confirmPhone");
            WD.wrapper.addClass("WD__section__wrapper--hide");
            WD.textNumber.removeClass("WD__callback__message__footer--active");
            setTimeout(function(){
                WD.showPhone = true;
            }, 100);
        },

        hidePhone: function(){
            WD.elem.removeClass("WD__callback--confirmPhone");
            WD.wrapper.removeClass("WD__section__wrapper--hide");
            WD.showPhone = false;
        },

        button: function(){
            var bt = document.querySelectorAll('.WD__callback__button')[0];
            var particles = document.querySelectorAll('.WD__callback__button__blob');
            var particleCount = particles.length;
            var clicked = false;

            for (var i = 0; i < particleCount; i++) {
                particles[i].classList.add(i % 2 ? 'WD__callback__button__blob--left' : 'WD__callback__button__blob--right');
            }

            bt.addEventListener('mouseenter', function() {
              TweenLite.to(bt.querySelectorAll('.WD__callback__button__bg'), 1.5, { scaleX: 1.05, ease: Expo.easeOut, delay: 0.2 });

              for (var i = 0; i < particleCount; i++) {
                var dir = i % 2 ? '-' : '+';
                var tl = new TimelineLite();
                tl.to(particles[i], 2, { x: dir + 18, scaleX: 1.4, ease: Expo.easeOut });
              }
            });

            bt.addEventListener('mouseleave', function() {
              if (clicked) return;

              TweenLite.to(bt.querySelectorAll('.WD__callback__button__bg'), 0.9, { scale: 1, ease: Power3.easeOut, overwrite: 'all' });

              for (var i = 0; i < particles.length; i++) {
                TweenLite.to(particles[i], 0.6, { x: 0, scaleX: 1, ease: Power3.easeOut, onComplete: function() {
                  //this.target.parentNode.removeChild(this.target);
                } });
              }
            });
        },

        close: function(){

            WD.notify.removeClass("WD__notify--active");

            WD.elem
            .addClass("WD__callback--end")
            .removeClass("WD__section--open");

            if (WD.showPhone) WD.hidePhone();

            _.onEndAnimation(WD.form[0], function(){

                WD.elem.attr("class", "WD__section WD__callback");

                WD.parallaxNotify.disable();
                WD.parallaxKeyboard.disable();

                $dom.frame.removeClass("unBlur");
            });
        }
    };

    var WD = yuapApp.callback;

})(Zepto, yuapApp.$dom, yuapApp.utils);
