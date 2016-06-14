window.FinTranDetails = Backbone.View.extend({

    tagName:'div',
    events: {
        'click button.btnsave': 'saveModel',
        "change input" :"changed"
    },

    initialize:function () {
        //nothing to do here
    },

    render:function () {
      $(this.el).html(this.template(this.model.toJSON()));
      $(this.el).find('.datepicker').datepicker();
      return this;
    },

    saveModel: function () {
        this.model.save(null, {
          success: function(model, response, options) {
            Backbone.history.navigate('#',{ trigger:true, replace: true })
          },
          error: function () {
            //Show error
          }
        });
    },

    changed: function (e) {
        var val = $(e.currentTarget).val();
        var prop = $(e.currentTarget).attr('model-property')
        this.model.set(prop, val);
    }
});