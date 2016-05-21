initBt();

function initBt() {
    var winWidth = $(window).width(),
        winHeight = $(window).height(),
        fr = document.querySelectorAll('#frame')[0],
        bt = document.querySelectorAll('.WD__callbutton')[0],
        bg = document.querySelectorAll('.WD__callbutton__circle')[0],
        blob = document.querySelectorAll('.WD__callbutton__circle__blob');

  fr.addEventListener('mousemove', function(e) {
    var deltaX = 88 / winWidth,
        deltaY = 88 / winHeight,
        pageX = bt.offsetLeft + e.pageX * deltaX,
        pageY = bt.offsetTop + e.pageY * deltaY;

    //if (e.pageX < winWidth / 2) return;

    var x = (pageX - bt.offsetLeft - bt.offsetWidth / 2) * 0.5,
        y = (pageY - bt.offsetTop - bt.offsetHeight / 2) * 0.6;

    TweenLite.to(blob[1], 4.2, { x: x, y: y, ease: Elastic.easeOut.config(1, 0.1) });
    TweenLite.to(blob[2], 2.8, { x: x, y: -y, ease: Elastic.easeOut.config(1, 0.1) });
    TweenLite.to(blob[3], 2.8, { x: -x, y: -y, ease: Elastic.easeOut.config(1, 0.1) });
  });

  bt.addEventListener('mousemove', function(e) {
    var x = (e.pageX - bt.offsetLeft - bt.offsetWidth / 2) * 0.6,
        y = (e.pageY - bt.offsetTop - bt.offsetHeight / 2) * 0.6;

    TweenLite.to(blob[1], 4.2, { x: x, y: y, ease: Elastic.easeOut.config(1, 0.1) });
    TweenLite.to(blob[2], 2.8, { x: x, y: -y, ease: Elastic.easeOut.config(1, 0.1) });
    TweenLite.to(blob[3], 2.8, { x: -x, y: -y, ease: Elastic.easeOut.config(1, 0.1) });
  });

  bt.addEventListener('mouseup', function(e) {
    var x = e.pageX - bt.offsetLeft - blob[0].offsetWidth / 2;
    var y = e.pageY - bt.offsetTop - blob[0].offsetHeight / 2;

    var dirX = Math.random() > 0.5 ? -1 : 1;
    var dirY = Math.random() > 0.5 ? -1 : 1;
    var r = getRandom(60, 80);

    Array.prototype.slice.call(blob, 1).forEach(function(bt) {
      var tl = new TimelineLite();
      tl.to(bt, 1.2, { x: dirX * r * Math.random() + '%', y: dirY * r * Math.random() + '%', ease: Elastic.easeOut.config(1, 0.2) });
      tl.to(bt, 1.2, { x: '0%', y: '0%', ease: Elastic.easeOut.config(1, 1) }, '-=1.1');
    });
  });
}

function getRandom(min, max){
  return Math.random() * (max - min) + min;
}
