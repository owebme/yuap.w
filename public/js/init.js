// yuapApp.alert.init();
yuapApp.panel.init();
yuapApp.callbutton.init();
// yuapApp.callback.init();
// yuapApp.reviews.init();
// yuapApp.contacts.init();
// yuapApp.messenger.init();

window.onload = function(){

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
