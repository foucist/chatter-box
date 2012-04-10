window.SearchPage = Backbone.View.extend({

    initialize:function () {
        this.template = _.template(tpl.get('search-page'));
    },

    render:function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        this.listView = new EmployeeListView({el: $('ul', this.el), model: this.model});  //<-- model is a collection here
        this.listView.render();
        return this;
    },

    events:{
        "keyup .search-key":"search"
    },

    search:function (event) {
        var key = $('.search-key').val();
        this.model.findByName(key);
    }
});

window.DirectReportPage = Backbone.View.extend({

    initialize:function () {
        this.template = _.template(tpl.get('report-page'));
    },

    render:function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        this.listView = new EmployeeListView({el: $('ul', this.el), model: this.model});
        this.listView.render();
        return this;
    }

});

window.EmployeePage = Backbone.View.extend({

    initialize:function () {
        this.template = _.template(tpl.get('employee-page'));
    },

    render:function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});

window.EmployeeListView = Backbone.View.extend({

    initialize:function () {
        this.model.bind("reset", this.render, this);
    },

    render:function (eventName) {
        $(this.el).empty();
        _.each(this.model.models, function (employee) {
            //console.log('rendering ' + employee);
            $(this.el).append(new EmployeeListItemView({model:employee}).render().el);
        }, this);
        return this;
    }

});

//START MY STUFF HERE...
window.LoginPage = Backbone.View.extend({

    initialize:function () {
        this.template = _.template(tpl.get('login'));
    },
    //this.model is a collection here
    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    },
});

window.SignupPage = Backbone.View.extend({

    initialize:function () {
        this.template = _.template(tpl.get('signup'));
    },
    //this.model is a collection here
    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    },
});

window.SelectChannelPage = Backbone.View.extend({

    initialize:function () {
        this.template = _.template(tpl.get('select_channel'));
    },
    //this.model is a collection here
    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    },
});

window.SelectProgramPage = Backbone.View.extend({

    initialize:function () {
        this.template = _.template(tpl.get('select_program'));
    },
    //this.model is a collection here
    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    },
});

window.ShowProgramActivityPage = Backbone.View.extend({

    initialize:function () {
        this.template = _.template(tpl.get('show_program_activity'));
    },
    //this.model is a collection here
    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    },
});

window.ShowDiscussionBoardPage = Backbone.View.extend({

    initialize:function () {
        this.template = _.template(tpl.get('show_discussion_board'));
    },
    //this.model is a collection here
    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    },
});

window.ShowDiscussionPage = Backbone.View.extend({

    initialize:function () {
        this.template = _.template(tpl.get('show_discussion'));
    },
    //this.model is a collection here
    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    },
});

window.ShowMerchandisePage = Backbone.View.extend({

    initialize:function () {
        this.template = _.template(tpl.get('show_program_merchandise'));
    },
    //this.model is a collection here
    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    },
});

window.ShowChatPage = Backbone.View.extend({

    initialize:function () {
        this.template = _.template(tpl.get('show_chat'));
    },
    //this.model is a collection here
    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    },
});
