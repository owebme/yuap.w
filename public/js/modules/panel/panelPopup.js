$(document).ready(function(){

    var WD = $(".WD__panel"),
        panelWrapper = WD.find(".WD__panel__wrapper");

    var hover = null;

    WD.find(".WD__panel__showPopup").on("mouseenter mouseleave", function(e){
        var $elem = $(this),
            popup = WD.find($elem.data("popup"));

        hover = null;

        if (e.type === "mouseenter"){
            hover = false;
            popup
            .css("left", ($elem.offset().left - 27 + $elem.width() / 2 - panelWrapper.offset().left - popup.width() / 2) + "px")
            .addClass("WD__panel__popup--active");

            popup.on("mouseenter mouseleave", function(e){
                if (e.type === "mouseenter") hover = true;
                else {
                    popup.removeClass("WD__panel__popup--active");
                    popup.off("mouseenter mouseleave");
                }
            });
        }
        else {
            setTimeout(function(){
                if (!hover) {
                    popup.removeClass("WD__panel__popup--active");
                    popup.off("mouseenter mouseleave");
                }
            }, 10);
        }
    });

});
