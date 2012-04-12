//Model
window.Question = Backbone.Model.extend({
    defaults: function() {
        return {
            /*** my stuff ***/
            qid: -1,
            skoutUserId: -1,
            name: "",
            imgSrc: "",
            isMyQuestion: true,
            questionText: "New question available soon!",
            answerText: "",
            isAnswered: false,
            lastUpdated: null,
            nextQuestion: null
        };
    },
});

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
                /* ..do something like the following
                $.ajax({
                    url: "localhost/discussions",
                    method: "post",
                    program_id: model.get('program_id');
                    discussion: model.get('discussion');
                    user_id: model.get('user_id');
                }); 
                */                
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

    loadData: function(discussion_id) {
        this.reset(store.findComments(discussion_id)); //TODO: Fix this..find a better way
    }, 

    findByName:function (key) {
        this.reset(store.findByName(key));
    }
});

