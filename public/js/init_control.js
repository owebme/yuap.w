// yuapApp.alert.init();
yuapApp.panel.init();
yuapApp.callbutton.init();
// yuapApp.callback.init();
// yuapApp.reviews.init();
// yuapApp.contacts.init();
// yuapApp.messenger.init();

window.onload = function(){

    $(".WD__controlPanel__options").on("click", function(){
        $(".WD__controlPanel__buttonSave").addClass("WD__controlPanel__buttonSave--active");
    });

    $(".WD__controlPanel__buttonSave").on("click", function(){
        var $button = $(this);
        $button.addClass("WD__controlPanel__buttonSave--saved");
        yuapApp.utils.onEndAnimation($button[0], function(){
            $button.removeClass("WD__controlPanel__buttonSave--saved WD__controlPanel__buttonSave--active");
        });
    });

    $(".WD__palette").on("click", ".WD__palette__current, .WD__palette__item", function(e){
        var $elem = $(e.currentTarget),
            $item = $elem.closest(".WD__palette"),
            select = null;

        if ($elem[0].getAttribute("class").match(/current/)){
            $item.addClass("WD__palette--active");
        }
        else if ($elem[0].getAttribute("class").match(/item/)){
            select = $elem.css("background-color");
            $item.find(".WD__palette__current")
            .css("background-color", select);
            $item.removeClass("WD__palette--active");
        }
    });

    $(".WD__select").on("click", ".WD__select__current, .WD__select__item", function(e){
        var $elem = $(e.currentTarget),
            $item = $elem.closest(".WD__select"),
            select = null;

        if ($elem[0].getAttribute("class").match(/current/)){
            $item.addClass("WD__select--active");
        }
        else if ($elem[0].getAttribute("class").match(/item/)){
            select = $elem.text();
            $item.removeClass("WD__select--active");
            $elem.addClass("WD__select__item--active")
            .siblings()
            .removeClass("WD__select__item--active");
            yuapApp.utils.onEndTransition($item.find(".WD__select__items")[0], function(){
                $item.find(".WD__select__current").text(select);
            });
        }
    });

    var Config = {
        color: null,
        style: null,
        tooltip: $(".WD__callbutton__tooltip").text()
    }

    magic.bindNode(Config, 'tooltip', $(".WD__textEdit > .WD__textEdit__current"), {
        setValue: function(value) {
            if (value) this.innerHTML = value;
        }
    });

    $(".WD__textEdit__input").on("keyup", function(){
        $(".WD__callbutton__tooltip").text(this.value);
    });

    var width = parseInt($(".WD__controlPanel").width());

    $(".WD__controlPanel__button").on("click", function(){
        var $elem = $(this),
            $sidebar = $($elem.data("sidebar"));

        if ($elem[0].getAttribute("class").match(/active/)){
            $elem.css("transform", "translate3d(0, 0, 0)")
            .text($elem.data("default"));
            $sidebar.removeClass("WD__controlPanel__sidebar--active");
        }
        else {
            $elem.text($elem.data("text"))
            .css("transform", "translate3d(" + (width - 133) + "px, 0, 0)");
            $(".WD__controlPanel__sidebar--active").removeClass("WD__controlPanel__sidebar--active");
            $sidebar.addClass("WD__controlPanel__sidebar--active");
        }
        $elem.toggleClass("WD__controlPanel__button--active");
    });

    $(".WD__textEdit").on("click", ".WD__textEdit__current, .WD__textEdit__save, .WD__textEdit__close", function(e){
        var $elem = $(e.currentTarget),
            $item = $elem.closest(".WD__textEdit"),
            $container = $item.find(".WD__textEdit__container").width(width - 30),
            $input = $item.find(".WD__textEdit__input");

        if ($elem[0].getAttribute("class").match(/current/)){
            $item.addClass("WD__textEdit--active");
            $container.css("width", (width - 30) + "px");
            $input.focus();
        }
        else if ($elem[0].getAttribute("class").match(/save/)){
            $item.removeClass("WD__textEdit--active");
            $container.css("width", "100%");
            Config.tooltip = $input.val();
        }
        else if ($elem[0].getAttribute("class").match(/close/)){
            $item.removeClass("WD__textEdit--active");
            $container.css("width", "100%");
        }
    });

    $(".WD__controlPanel__switcher").on("change", function(){
        var $options = $(this).closest(".WD__controlPanel")
        .find(".WD__controlPanel__options");

        if (this.checked){
            $options.removeClass("WD__controlPanel__options--hide");
        }
        else {
            $options.addClass("WD__controlPanel__options--hide");
        }
    });

    // new Parallax(yuapApp.$dom.frame[0], {
    //     calibrationThreshold: 500,
    //     calibrationDelay: 1500,
    //     calibrateX: true,
    //     scalarX: 20.0,
    //     scalarY: 20.0,
    //     frictionX: 0.25,
    //     frictionY: 0.2,
    //     originX: 0.5,
    //     originY: 0.5
    // });

    // setTimeout(function(){
    //     $(".WD__offer").addClass("WD__offer--show");
    // }, 500);

    // var body = document.body,
    //     timer;
    //
    // window.addEventListener('scroll', function(){
    //     clearTimeout(timer);
    //     if (!body.classList.contains('WD__disable__hover')){
    //         body.classList.add('WD__disable__hover');
    //     }
    //
    //     timer = setTimeout(function(){
    //         body.classList.remove('WD__disable__hover')
    //     },500);
    //
    // }, false);

};
