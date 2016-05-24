(function(){

    app.sections = {

        ready: false,

        items: {},

        state: null,

        init: function(section){

            $sections = $body.find('#sections');

            $sections.on('dragstart selectstart', function() {
                return false;
            });

            var index = 100,
                i = 0;

            $sections.find(".section__marquee").each(function() {
                _this.items[this.getAttribute("data-marquee")] = i;
                if (i === 0) {
                    _this.state = this.getAttribute("data-marquee");
                    this.style.opacity = "1";
                }
                this.style.zIndex = index;
                index--;
                i++;
            });

            _this.marquee = app.plugins.marquee($sections, {
                vertical: false,
                screens: '.section__marquee',
                effect: 'space',
                mousewheel: false,
                spaceClass: 'horizontal-space',
                duration: app.device.isPhone ? 350 : 450
            });

            var scroll = _this.marquee.scroll;

            scroll.on('scrollEnd', function(){
                _this.state = _this.marquee.section;
                if (_this.state === "dashboard"){
                    app.iScrollDashboardList.refresh();
                }
                else if (_this.state === "data"){
                    app.iScrollDataList.refresh();
                }
            });

            if (section) _this.nav(section, 0);
        },

        nav: function(section, duration){
            if (!section) return;
            var i = _this.items[section];
            if (i !== undefined) {
                _this.state = section;
                _this.marquee.scrollTo(i, duration !== undefined ? duration : undefined);
            }
        }
    };

    var _this = app.sections;

})();
