$(function(){

    var WD_ = {

        number: "",

        init: function(){

            WD.elem = $(".WD__callback");
            WD.form = WD.elem.find(".WD__callback__form");
            WD.notify = WD.elem.find(".WD__notify");
            WD.textNumber = WD.elem.find(".WD__callback__message__footer");
            WD.line = WD.elem.find(".WD__callback__message__line");
            WD.title = WD.form.find(".WD__callback__title");
            WD.input = WD.form.find(".WD__callback__form__input");

            this.render();
            this.keyboard();
        },

        render: function(){

            setTimeout(function(){
                WD.elem.addClass("WD__callback--start");
                setTimeout(function(){
                    WD.notify.addClass("WD__notify--active");
                }, 1350);
            }, 300);

            WD.parallaxNotify = new Parallax(WD.notify[0]);

            WD.parallaxKeyboard = new Parallax(WD.form[0]);

            WD.input.focus();

            WD.elem.on("mouseover click", function(){
                WD.input.focus();
            });
        },

        keyboard: function(){

            WD.form.on("click", ".WD__callback__keyboard__item", function(){
                var num = $(this).data("number");
                WD.clickNumber(num);
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
                }
            });

        },

        animNumber: function(num){

            var $button = WD.elem
            .find(".WD__callback__keyboard__item[data-number="+ num +"]");

            $button.addClass("WD__callback__keyboard__item--active");

            setTimeout(function(){
                $button.removeClass("WD__callback__keyboard__item--active");
            }, 150);
        },

        clickNumber: function(num){

            if (num > -1){
                WD.number += "" + num;
            }
            else if (num === "-" && WD.number.length > 0){
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
                WD.textNumber
                .removeClass("WD__callback__message__footer--active");
                WD.line.css("width", "0%");
                WD.number = "";
            }
        }
    };

    var WD = WD_;

    WD.init();

});
