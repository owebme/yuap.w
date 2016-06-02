(function($, $dom, _){

    yuapApp.define("callbutton.cloud");

    var App = yuapApp;

    yuapApp.callbutton.cloud = {

        init: function(){

            WD.elem = App.callbutton.elem;
            WD.container = WD.elem.find('.WD__callbutton__cloud');
            WD.formContainer = WD.container.find('.WD__callbutton__form');
            WD.formPhone = WD.formContainer.find('.WD__callbutton__form__phone');
            WD.title = WD.container.find('.WD__callbutton__title');
            WD.titleText = WD.title.text();
            WD.subTitle = WD.formContainer.find('.WD__callbutton__form__subtitle');
            WD.subTitleText = WD.subTitle.html();
            WD.onComplete = false;

            WD.render();
            WD.date.init();
            WD.time.init();
        },

        render: function(){

            WD.formContainer.find(".WD__callbutton__form__phone").mask("(000) 000-00-00", {
                onChange: function(){
                    if (WD.onComplete) WD.hideButtonCall();
                    WD.onComplete = false;
                },
                onComplete: function(){
                    if (!WD.onComplete) WD.showButtonCall();
                    WD.onComplete = true;
                }
            });

            WD.formPhone.on("keydown", function(e){
                if (e.which == "13"){
                    if (WD.onComplete) WD.calling();
                    else {
                        App.alert.open({
                            title: "Введите свой номер из 10 цифр",
                            one: true
                        });
                    }
                }
            });
        },

        date: {

            init: function(){

                WD.dateContainer = WD.container.find(".WD__callbutton__date");
                WD.dateNext = WD.dateContainer.find(".WD__callbutton__date__arrow__right");
                WD.datePrev = WD.dateContainer.find(".WD__callbutton__date__arrow__left");
                WD.dateContainer.active = WD.dateContainer.find(".WD__callbutton__date__item--active");
                WD.dateContainer.now = true;

                WD.date.render();
            },

            render: function(){

                WD.dateNext.on("click", function(){
                    var $next = WD.dateContainer.active.next();
                    if (!$next || !$next.length) $next = WD.dateContainer.find(".WD__callbutton__date__item:first");
                    WD.date.select($next);
                });

                WD.datePrev.on("click", function(){
                    var $prev = WD.dateContainer.active.prev();
                    if (!$prev || !$prev.length) $prev = WD.dateContainer.find(".WD__callbutton__date__item:last");
                    WD.date.select($prev);
                });
            },

            select: function($elem){

                WD.dateContainer.active.removeClass("WD__callbutton__date__item--active");
                $elem.addClass("WD__callbutton__date__item--active");
                WD.dateContainer.active = $elem;

                if ($elem.hasClass("WD__callbutton__date__item--big")) WD.title.text(WD.titleText);
                else WD.title.text(WD.title.data("change"));

                if ($elem.hasClass("WD__callbutton__date__item__now")) {
                    if (!WD.dateContainer.now) WD.subTitle.html(WD.subTitleText);
                    WD.time.close();
                    WD.dateContainer.now = true;
                }
                else {
                    if (WD.dateContainer.now) WD.subTitle.html(WD.subTitle.data("change"));
                    WD.time.open();
                    WD.dateContainer.now = false;
                }
            }

        },

        time: {

            init: function(){

                WD.timeContainer = WD.elem.find(".WD__callbutton__time__container");
                WD.timeHours = WD.timeContainer.find(".WD__callbutton__time__hours");
                WD.timeMinutes = WD.timeContainer.find(".WD__callbutton__time__minutes");
                WD.timeContainer.hover = false;
                WD.timeContainer.$elem = null;
                WD.timeContainer.$items = null;

                WD.time.render();
            },

            render: function(){

                WD.timeContainer
                .find(".WD__callbutton__time__current")
                .on("mouseenter mouseleave click", function(e){

                    if (e.type === "mouseenter" || e.type === "mouseover"){
                        setTimeout(function(){
                            if (!WD.timeContainer.hover) {
                                WD.timeContainer.$elem = $(e.target);
                                WD.timeContainer.$items = WD["time" + WD.timeContainer.$elem.data("items")];
                                WD.time.showItems();
                            }
                        }, 1);
                    }
                    else if (e.type === "click"){
                        WD.time.hideItems();
                    }
                    else {
                          setTimeout(function(){
                              if (!WD.timeContainer.hover) {
                                  WD.timeContainer.$elem = $(e.target);
                                  WD.timeContainer.$items = WD["time" + WD.timeContainer.$elem.data("items")];
                                  WD.time.hideItems();
                              }
                          }, 1);
                    }
                });

                WD.timeContainer
                .find(".WD__callbutton__time__items")
                .on("mouseenter mouseleave", function(e){
                    if (e.type === "mouseenter" || e.type === "mouseover"){
                        WD.timeContainer.hover = true;
                    }
                    else {
                        WD.time.hideItems();
                    }
                });

                WD.timeContainer
                .on("click", ".WD__callbutton__time__item", function(){
                    WD.timeContainer.$elem.text($(this).text());
                    WD.time.hideItems();
                });
            },

            showItems: function(){
                WD.timeContainer.$elem.addClass("WD__callbutton__time__current--hover");
                WD.timeContainer.$items.addClass("WD__callbutton__time__items--active");
            },

            hideItems: function(){
                WD.timeContainer.$elem.removeClass("WD__callbutton__time__current--hover");
                WD.timeContainer.$items.removeClass("WD__callbutton__time__items--active");
                WD.timeContainer.hover = false;
            },

            open: function(){

                WD.timeContainer.addClass("WD__callbutton__time__container--active");
            },

            close: function(){

                WD.timeContainer.removeClass("WD__callbutton__time__container--active");
            }
        },

        showButtonCall: function(){

            WD.container.addClass("WD__callbutton__cloud--showButtonCall");
        },

        hideButtonCall: function(){

            WD.container.removeClass("WD__callbutton__cloud--showButtonCall");
        },

        calling: function(){

            WD.elem.addClass("WD__callbutton--calling");
        },

        open: function(){

            WD.elem.addClass("WD__callbutton--open");
            _.onEndTransition(WD.container[0], function(){
                WD.formPhone.focus();
            });
        }
    };

    var WD = yuapApp.callbutton.cloud;

})(Zepto, yuapApp.$dom, yuapApp.utils);
