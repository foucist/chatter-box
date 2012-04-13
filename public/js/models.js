//Model

window.Discussion = Backbone.Model.extend({
    sync: function (method, model, options) {
        switch (method) {
            case "read":
                if (model.id) {
                    // Request to read a single item identified by its id.
                    options.success(store.findDiscussionById(model.id));
                }
                break;
            case "update":
                alert("update something");
                break;
            case "create":
                store.createDiscussion(model.get('program_id'), model.get('discussion'), model.get('user_id'));              
                var data = {"discussion":{program_id: model.get('program_id'), title: model.get('discussion'), user_id: model.get('user_id')}};
                $.post('discussions.json', data);
                break;
        }
    },

    defaults: function() {
        return {
            program_id: -1,
            discussion: "",
            deleted: false,
            user_id: -1,
            updated_at: null,
            created_at: null
        };
    },
});

window.Comment = Backbone.Model.extend({
    sync: function (method, model, options) {
        switch (method) {
            case "read":
                break;
            case "update":
                break;
            case "create":
                var newComment = store.createNewComment(model.get('discussion_id'), model.get('comment'), model.get('user_id')); 
                options.success(newComment);              
                var data = {"comment":{body: model.get('comment'), user_id: model.get('user_id')}};
                $.post('/discussions/'+model.get('discussion_id') +'/comments.json', data);
                break;
        }
    },

    defaults: function() {
        return {
            discussion_id: -1,
            comment: "",
            deleted: false,
            user_id: -1,
            updated_at: null,
            created_at: null
        };
    },
});

//Collection
window.DiscussionsCollection = Backbone.Collection.extend({
    model: Discussion,

    loadData: function(program_id) {
        this.reset(store.findDiscussions(program_id)); //TODO: Fix this..find a better way
    }, 

    findByName:function (key) {
        this.reset(store.findByName(key));
    }
});

window.CommentsCollection = Backbone.Collection.extend({
    model: Comment,
    discussion_id: -1,

    sync: function (method, model) {
        switch (method) {
            case "read":
                this.reset(store.findComments(model.discussion_id));
                /* TODO
                $.ajax({
                    STUFF
                }); 
                */
                break;
            case "update":
                alert("collection update");
                break;
            case "create":
                alert("collection create");           
                break;
        }
    },

    findByName:function (key) {
        this.reset(store.findByName(key));
    }
});

