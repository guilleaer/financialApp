window.FincTranListView = Backbone.View.extend({

    tagName:'ul',
    className:'list-group',

    initialize:function () {
        var self = this;
        this.model.bind("reset", this.render, this);
        this.model.bind("add", function (financialEntry) {
            $(self.el).append(new FinTranItemView({model:financialEntry}).render().el);
        });
    },

    render:function () {
        $(this.el).empty();
        _.each(this.model.models, function (financialEntry) {
            $(this.el).append(new FinTranItemView({model:financialEntry}).render().el);
        }, this);
        return this;
    }
});

window.FinTranItemView = Backbone.View.extend({

    tagName:"li",
    className: 'list-group-item',

    initialize:function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render:function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});