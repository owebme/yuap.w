yuapApp.alert.init();
yuapApp.panel.init();
yuapApp.callbutton.init();
yuapApp.callback.init();
yuapApp.reviews.init();

window.onload = function(){

    var $slider = $(".WD__products__container");

    $slider.itemslide();

    $(".WD__products__arrow__next").on("click", function(){
        $slider.next();
        $slider.reload();
    });

    $slider.on('changeActiveIndex', function(e) {
        var index = $slider.getActiveIndex();
        //if (index > 1)
        console.log("new index: " + index);
    });


};
