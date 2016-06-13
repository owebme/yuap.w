yuapApp.alert.init();
yuapApp.panel.init();
yuapApp.callbutton.init();
yuapApp.callback.init();
yuapApp.reviews.init();
yuapApp.contacts.init();

window.onload = function(){

    var $elem = $(".WD__contacts"),
        $svg = $(".WD__contacts__svg")[0],
        $content = $(".WD__contacts__content"),
        $box = $content.find(".WD__contacts__content__box"),
        $boxHeight = $box.height(),
        $details = $box.find(".WD__contacts__details__container"),
        $link = $box.find(".WD__contacts__openDetails");

    $box.css("height", $boxHeight + "px").data("height", $boxHeight);

    $link.on("click", function(e){
        e.preventDefault();
        if ($link.hasClass("WD__contacts__openDetails--active")){
            $link.removeClass("WD__contacts__openDetails--active");
            $box.css({
                [yuapApp.prefixed["transform"]]: "translate3d(0, 0, 0)",
                "height": $box.data("height") + "px"
            });
            $details.removeClass("WD__contacts__details--open");
        }
        else {
            $link.addClass("WD__contacts__openDetails--active");
            $box.css({
                [yuapApp.prefixed["transform"]]: "translate3d(0, -120px, 0)",
                "height": "680px"
            });
            $details.addClass("WD__contacts__details--open");
        }
    });

    var $button = $(".WD__contacts__button__fullscreen"),
        fullscreen = false,
        feedback = false;

    $button.on("click", function(e){
        e.preventDefault();
        if ($button.hasClass("WD__contacts__button__fullscreen--active")){
            $button.removeClass("WD__contacts__button__fullscreen--active");
            $elem.removeClass("WD__contacts--fullscreen");
            fullscreen = false;
        }
        else {
            $button.addClass("WD__contacts__button__fullscreen--active");
            $elem.addClass("WD__contacts--fullscreen");
            fullscreen = true;
        }
    });

    $(".WD__contacts__button__feedback").on("click", function(e){
        $elem.addClass("WD__contacts--feedback");
        feedback = true;
    });

    $(".WD__feedback__close").on("click", function(e){
        $elem.removeClass("WD__contacts--feedback");
        feedback = false;
    });

    feedback = true;

    var $businessCard = $(".WD__businessCard"),
        $businessCardClose = $businessCard.find(".WD__businessCard__close"),
        $businessCardButton = $(".WD__contacts__button__businessCard");

    $businessCardButton.on("click", function(e){
        $businessCardButton.addClass("WD__contacts__button__businessCard--active");
        $businessCard.addClass("WD__businessCard--open");
    });

    $(".WD__feedback").on("click", ".WD__feedback__field", function(e){
        var $elem = $(e.currentTarget);
            $input = $elem.find("input");

        $elem.addClass("WD__feedback__field--focused");
        $input.focus();
    });

    $businessCardClose.on("click", function(e){
        $businessCard
        .addClass("WD__businessCard--close")
        .removeClass("WD__businessCard--open");
        yuapApp.utils.onEndTransition($businessCard[0], function(){
            $businessCardButton.removeClass("WD__contacts__button__businessCard--active");
            $businessCard.removeClass("WD__businessCard--close");
        });
    });

    $(document).on("mousemove", function(e){

        var screen = yuapApp.sizes.width * 0.75,
            half = yuapApp.sizes.width * 0.5,
            fourth = yuapApp.sizes.width * 0.25,
            x1 = e.pageX * 0.2,
            x2 = e.pageX * 0.15,
            s = e.pageX < screen ? ((screen - e.pageX) / screen) * 10 : 0,
            left = e.pageX < screen ? ((screen - e.pageX) / screen) * 310 : 1;

        if (e.pageX > screen || fullscreen || feedback) return;

        x1 *= ((screen - e.pageX) / screen) * 2;

        if (e.pageX < screen && e.pageX > half) {
            var delta = (screen - e.pageX) / fourth;
            s *= delta;
        }

        if (x2 < 60) return;

        var animHover = function(){
            $svg.setAttribute("d", "m" + s + ",0 a0,0,0,0,0,30,0 a0,0,0,0,0,0,40 a0,0,0,0,0,-30,0 a" + x1 + "," + x2 + ",0,0,0,0,-40 z");
            $content[0].style[yuapApp.prefixed["transform"]] = "translate3d(" + left + "px, 0, 0)";
        };

        yuapApp.utils.raf(animHover);
        animHover();
    });

};
