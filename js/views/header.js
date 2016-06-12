
window.HeaderView = Backbone.View.extend({
    tagName:'nav',
    className:'navbar navbar-default',
    render: function () {
        $(this.el).html(this.template());
        return this;
    },
    select: function(menuItem) {
        $('.nav li').removeClass('active');
        $('.' + menuItem).addClass('active');
    }

});