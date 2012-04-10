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

