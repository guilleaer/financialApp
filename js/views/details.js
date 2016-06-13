window.FinTranDetails = Backbone.View.extend({

    tagName:'div',

    initialize:function () {
        //nothing to do here
    },

    render:function () {
      debugger;
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    }
});