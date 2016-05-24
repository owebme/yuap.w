(function(app){

    app.define("api");

    app.api = {

        callback: {

            open: function(){
                app.callback.open();
            },

            close: function(){
                app.callback.close();
            }
        }

    };

})(yuapApp);
