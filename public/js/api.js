(function(app){

    app.api = {

        callback: {

            open: function(){
                app.callback.open();
            },

            close: function(){
                app.callback.close();
            }
        },

        reviews: {

            open: function(){
                app.reviews.open();
            },

            close: function(){
                app.reviews.close();
            }
        },

        products: {

            open: function(){
                app.panel.products.open();
            },

            close: function(){
                app.panel.products.close();
            }
        }

    };

})(yuapApp);
