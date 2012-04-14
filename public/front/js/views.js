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
       var modelJSON = this.model.toJSON();
        
        $(this.el).html(this.template(modelJSON));
        this.listView = new ProgramListView({    el: $('ul', this.el), 
                                                    model: this.model
                                                });  //<-- model is a collection here
        this.listView.render();
        return this;
    },
});

window.ProgramListView = Backbone.View.extend({

    initialize:function () {
        this.model.bind("reset", this.render, this);
    },

    render:function (eventName) {
        $(this.el).empty();
        _.each(this.model.models, function (program) {
            $(this.el).append(new ProgramListItemView({model:program}).render().el);
        }, this);
        return this;
    }
});

window.ProgramListItemView = Backbone.View.extend({
    tagName:"li",
    initialize:function () {
        this.template = _.template(tpl.get('program-list-item'));
    },

    render:function (eventName) {
        var modelJSON = this.model.toJSON();
        $(this.el).html(this.template(modelJSON));
        return this;
    }
});

window.ShowProgramActivityPage = Backbone.View.extend({

    initialize:function () {
        this.template = _.template(tpl.get('show_program_activity'));
    },
    //this.model is a collection here
    render:function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },
});

window.AddDiscussionPage = Backbone.View.extend({

    initialize:function () {
        this.template = _.template(tpl.get('add_discussion')); 
    },
    //this.model is a collection here
    render:function (eventName) {    
       $(this.el).html(this.template());
        return this;
    },
});

window.ShowDiscussionsPage = Backbone.View.extend({

    initialize:function () {
        this.template = _.template(tpl.get('show_discussions'));
    },

    events:{
        "keyup .search-key":"search"
    },

    search:function (event) {
        var key = $('.search-key').val();
        this.model.findByDiscussion(key);
    },

    //this.model is a collection here
    render:function (eventName) {
        var modelJSON = this.model.toJSON();
        
        $(this.el).html(this.template(modelJSON));
        this.listView = new DiscussionListView({    el: $('#myList', this.el), 
                                                    model: this.model
                                                });  //<-- model is a collection here
        this.listView.render();
        return this;
    },
});

window.DiscussionListView = Backbone.View.extend({

    initialize:function () {
        this.model.bind("reset", this.render, this);
    },

    render:function (eventName) {
        $(this.el).empty();
        _.each(this.model.models, function (discussion) {
            $(this.el).append(new DiscussionListItemView({model:discussion}).render().el);
        }, this);
        return this;
    }
});

window.DiscussionListItemView = Backbone.View.extend({
    tagName:"li",
    className: "clearfix",
    initialize:function () {
        this.template = _.template(tpl.get('discussion-list-item'));
    },

    render:function (eventName) {
        var modelJSON = this.model.toJSON();
        $(this.el).html(this.template(modelJSON));
        return this;
    }
});

window.ShowCommentsPage = Backbone.View.extend({

    initialize:function () {
        this.template = _.template(tpl.get('show_comments'));
        this.model.bind('add', this.render, this);

    },

    //this.model is a collection here
    render:function (eventName) { 

        var commentsCollectionJSON = this.model.toJSON();
        commentsCollectionJSON.discussion = this.options.discussion.toJSON();

        $(this.el).html(this.template(commentsCollectionJSON));
        
        this.listView = new CommentListView({el: $('#comments', this.el), model: this.model});  //<-- model is a collection here
        this.listView.render();

        //for reply section to appeaer
        var $links = $('.thread li', this.el);
        $links.click(function(){
            $links.removeClass('selected');
            $(this).addClass('selected');
        });

        return this;
    },
});

window.CommentListView = Backbone.View.extend({
    tagName: 'li',
    className: 'clearfix',
    initialize:function () {
        this.model.bind("reset", this.render, this);
    },

    render:function (eventName) {
        $(this.el).empty();
        _.each(this.model.models, function (comment) {
            $(this.el).append(new CommentListItemView({model:comment}).render().el);
        }, this);
        return this;
    }
});

window.CommentListItemView = Backbone.View.extend({
    tagName:"li",
    initialize:function () {
        this.template = _.template(tpl.get('comment-list-item'));
    },

    render:function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
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
