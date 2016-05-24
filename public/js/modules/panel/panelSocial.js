$(document).ready(function(){

    var WD = $(".WD__panel__social"),
        buttons = WD.find(".WD__panel__social__button:not(.WD__panel__social__button--show)");

    WD.find(".WD__panel__social__more").on("click", function(e){
        $(this).removeClass("WD__panel__social__button--show");
        buttons.addClass("WD__panel__social__button--show");
    });

});
