window.Router = Backbone.Router.extend({

    routes: {
        "": "home",
        "fincEntryDetails/:id": 'fincEntryDetails'
    },
    initialize: function () {
        this.model = this.model || new GAL.FinancialApp.Collection.FinancialEntryCollection();
        this.modalAddView = new ModalAddView({collection: this.model});
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.render().el);
        $('.modals').html(this.modalAddView.render().el);
    },

    home: function () {
      // Since the home view never changes, we instantiate it and render it only once
      var me = this;
      //TODO: loading
      this.model.fetch({
        success: function (collection, response, options) {
          if (!me.fincTranListView) {
            me.fincTranListView = new FincTranListView({model: me.model});
            me.fincTranListView.render();
          } else {
            me.fincTranListView.delegateEvents(); // delegate events when the view is recycled
          }
          $("#content").html(me.fincTranListView.el);
          //TODO: end loading
        }, 
        error: function () {
          debugger;
        //TODO: end loading and show error
        }
      });
      this.headerView.select('home-menu');
    },

    fincEntryDetails: function (id) {
        var fincTran = new GAL.FinancialApp.Model.FinancialEntry({id: id});
        fincTran.fetch({
            success: function (data) {
              $('#content').html(new FinTranDetails({model: data}).render().el);
            }
        });
    }
});

templateLoader.load(["FinTranItemView", "FinTranDetails", "HeaderView", "ModalAddView"],
    function () {
        app = new Router();
        Backbone.history.start();
    });