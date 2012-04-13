//Model
window.Program = Backbone.Model.extend({
    urlRoot: '/programs',
    sync: function (method, model, options) {
        switch (method) {
            case "read":
                options.success(model);
                break;
            case "update":
                alert("update something");
                break;
            case "create":
                store.createDiscussion(model.get('program_id'), model.get('discussion'), model.get('user_id'));              
                break;
        }
    },

    defaults: function() {
        return {
            channel_id: -1,
            program: "",
            tagline: "",
            img: "",
            start_time: null,
            end_time: null,
            updated_at: null,
            created_at: null
        };
    },
});

window.Discussion = Backbone.Model.extend({
    urlRoot: '/discussions',
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
  urlRoot: '/discussions/1/comments',
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
window.ProgramsCollection = Backbone.Collection.extend({
  url: '/programs.json',
    model: Program,
    channel_id: -1,

    sync: function (method, model) {
        switch (method) {
            case "read":
                this.reset(store.findPrograms(model.channel_id)); 
                break;
            case "update":
                alert("program collection update");
                break;
            case "create":
                alert("program collection create");           
                break;
        }
    },
});


window.DiscussionsCollection = Backbone.Collection.extend({
  url: '/discussions.json',
    model: Discussion,
    program_id: -1,

    loadData: function(program_id) {
      this.fetch({discussion: {program_id: program_id}});
        // this.reset(store.findDiscussions(program_id)); //TODO: Fix this..find a better way
    },

     /* doesn't work?
    sync: function (method, model) {
        switch (method) {
            case "read":
                this.fetch({discussion: {program_id: program_id}});
             //   this.reset(store.findDiscussions(model.program_id)); 
                break;
            case "update":
                alert("collection update");
                break;
            case "create":
                alert("collection create");           
                break;
        }
    },
    */

    findByName:function (key) {
        this.reset(store.findByName(key));
    }
});

window.CommentsCollection = Backbone.Collection.extend({
  url: '/discussions/1/comments.json',
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

