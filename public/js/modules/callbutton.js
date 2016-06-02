(function($, $dom, _){

    yuapApp.define("callbutton");

    var API = yuapApp.api,
        sizes = yuapApp.sizes,
        device = yuapApp.device;

    yuapApp.callbutton = {

        init: function(){

            WD.elem = _.template("callbutton");
            WD.button = WD.elem[0];
            WD.blob = WD.elem.find('.WD__callbutton__circle__blob');

            WD.render();
            WD.cloud.init();
        },

        render: function(){

            WD.elem.on('click', function(e) {
                //API.callback.open();
                WD.cloud.open();
            });

            if (device.isSafari || device.isFirefox) return;

            $dom.frame.on('mousemove', function(e) {
                var deltaX = 88 / sizes.width,
                    deltaY = 88 / sizes.height,
                    pageX = WD.button.offsetLeft + e.pageX * deltaX,
                    pageY = WD.button.offsetTop + e.pageY * deltaY;

                //if (e.pageX < winWidth / 2) return;

                var x = (pageX - WD.button.offsetLeft - WD.button.offsetWidth / 2) * 0.5,
                    y = (pageY - WD.button.offsetTop - WD.button.offsetHeight / 2) * 0.6;

                TweenLite.to(WD.blob[1], 4.2, { x: x, y: y, ease: Elastic.easeOut.config(1, 0.1) });
                TweenLite.to(WD.blob[2], 2.8, { x: x, y: -y, ease: Elastic.easeOut.config(1, 0.1) });
                TweenLite.to(WD.blob[3], 2.8, { x: -x, y: -y, ease: Elastic.easeOut.config(1, 0.1) });
            });

            WD.elem.on('mousemove', function(e) {
                var x = (e.pageX - WD.button.offsetLeft - WD.button.offsetWidth / 2) * 0.6,
                    y = (e.pageY - WD.button.offsetTop - WD.button.offsetHeight / 2) * 0.6;

                    TweenLite.to(WD.blob[1], 4.2, { x: x, y: y, ease: Elastic.easeOut.config(1, 0.1) });
                    TweenLite.to(WD.blob[2], 2.8, { x: x, y: -y, ease: Elastic.easeOut.config(1, 0.1) });
                    TweenLite.to(WD.blob[3], 2.8, { x: -x, y: -y, ease: Elastic.easeOut.config(1, 0.1) });
            });

            // WD.elem.on('mouseup', function(e) {
            //     var x = e.pageX - WD.button.offsetLeft - WD.blob[0].offsetWidth / 2;
            //     var y = e.pageY - WD.button.offsetTop - WD.blob[0].offsetHeight / 2;
            //
            //     var dirX = Math.random() > 0.5 ? -1 : 1;
            //     var dirY = Math.random() > 0.5 ? -1 : 1;
            //     var r = WD.getRandom(60, 80);
            //
            //     Array.prototype.slice.call(WD.blob, 1).forEach(function(bt) {
            //         var tl = new TimelineLite();
            //         tl.to(bt, 1.2, { x: dirX * r * Math.random() + '%', y: dirY * r * Math.random() + '%', ease: Elastic.easeOut.config(1, 0.2) });
            //         tl.to(bt, 1.2, { x: '0%', y: '0%', ease: Elastic.easeOut.config(1, 1) }, '-=1.1');
            //     });
            // });
      },

      getRandom: function(min, max){
        return Math.random() * (max - min) + min;
      }
  };

  var WD = yuapApp.callbutton;

})(Zepto, yuapApp.$dom, yuapApp.utils);
