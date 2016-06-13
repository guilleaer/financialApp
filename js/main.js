window.Router = Backbone.Router.extend({

    routes: {
        "": "home",
        "fincEntryDetails/:id": 'fincEntryDetails'
        /*"contact": "contact",
        "employees/:id": "employeeDetails"*/
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.render().el);
    },

    home: function () {
      // Since the home view never changes, we instantiate it and render it only once
      var me = this;
      this.model = this.model || new GAL.FinancialApp.Collection.FinancialEntryCollection();
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
                // Note that we could also 'recycle' the same instance of EmployeeFullView
                // instead of creating new instances
                $('#content').html(new FinTranDetails({model: data}).render().el);
            }
        });
    }

    // contact: function () {
    //     if (!this.contactView) {
    //         this.contactView = new ContactView();
    //         this.contactView.render();
    //     }
    //     $('#content').html(this.contactView.el);
    //     this.headerView.select('contact-menu');
    // },

    // employeeDetails: function (id) {
    //     var employee = new Employee({id: id});
    //     employee.fetch({
    //         success: function (data) {
    //             // Note that we could also 'recycle' the same instance of EmployeeFullView
    //             // instead of creating new instances
    //             $('#content').html(new EmployeeView({model: data}).render().el);
    //         }
    //     });
    // }

});

//templateLoader.load(["HomeView", "ContactView", "HeaderView", "EmployeeView", "EmployeeSummaryView", "EmployeeListItemView"],
templateLoader.load(["FinTranItemView", "FinTranDetails", "HeaderView"],
    function () {
        app = new Router();
        Backbone.history.start();
    });