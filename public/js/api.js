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

        contacts: {

            open: function(){
                app.contacts.open();
            },

            close: function(){
                app.contacts.close();
            }
        },

        eCard: {

            open: function(){
                app.contacts.eCard.open();
            },

            close: function(){
                app.contacts.eCard.close();
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

        messenger: {

            open: function(){
                if (app.panel.initialize) app.panel.close();
                app.messenger.open();
            },

            close: function(){
                if (app.panel.initialize) app.panel.open();
                app.messenger.close();
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
