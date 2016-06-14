window.ModalAddView = Backbone.View.extend({

    tagName:'div',
    events: {
        'click button.btncreate': 'createNew',
    },

    initialize:function () {
      this.model = new GAL.FinancialApp.Model.FinancialEntry();
        //nothing to do here
    },

    render:function () {
      var me = this;
      $(this.el).html(this.template());
      //reset fields
      $(this.el).on("hidden.bs.modal", function() {
        var inputs = $(me.el).find('input[model-property]');
        _.each(inputs, function (ina) {
           var val = $(ina).val('');
        }, this);  
      });
      $(this.el).find('.datepicker').datepicker();
      return this;
    },

    resetModal: function (inputs) {
      _.each(inputs, function (ina) {
        var val = $(ina).val('');
      }, this);  
    },

    createNew: function (e) {
        var me = this;
        var inputs = $('input[model-property]');
        _.each(inputs, function (ina) {
          var prop = $(ina).attr('model-property');
          var val = $(ina).val();
          if (prop === 'date') {
            //assuming valid format
            val = new Date(val);
          }
          this.model.set(prop, val);
        }, this);          
        this.model.save(null, {
          success: function(model, response, options) {
            me.collection.add(model);
            me.resetModal(inputs);
            $(me.el).modal('hide');
          },
          error: function (e) {
            console.log(e);
          }
        });
    }
});