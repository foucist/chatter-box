// Template loader
tpl = {

    templates:{},

    loadTemplates:function(names, callback) {

        var deferreds = [];

        var self = this;

        $.each(names, function(index, name) {
            deferreds.push( $.get('tpl/' + name + '.html', function(data) {
                self.templates[name] = data;
            }));
        });

        $.when.apply(null, deferreds).done(callback);
    },

    // Get template by name from hash of preloaded templates
    get:function (name) {
        return this.templates[name];
    }

}

// In-memory Store
store = {

    discussions: {},
    comments: {},
    populate: function() {
        this.discussions[1] = {id: 1, program_id: 1, user_id: 1, discussion: 'Do you think Aum looks hot in jeans?', updated_at: Date.now()};
        this.discussions[2] = {id: 2, program_id: 1, user_id: 1, discussion: 'How should the ending story be?', updated_at: Date.now()};
        this.discussions[3] = {id: 3, program_id: 1, user_id: 2, discussion: 'Why did Reya hit her mother?', updated_at: Date.now()};
        this.discussions[4] = {id: 4, program_id: 2, user_id: 3, discussion: 'Can we use ChatterBox to win the prize?', updated_at: Date.now()};
        this.discussions[5] = {id: 5, program_id: 2, user_id: 4, discussion: 'Is this gameshow too easy?', updated_at: Date.now()};

        this.comments[1] = {id: 1, discussion_id: 1, reply_to_comment_id: 0, user_id: 1, comment: 'Hell yeah! hot and sexy!', updated_at: (new Date()).getDate()-4};
        this.comments[2] = {id: 2, discussion_id: 1, reply_to_comment_id: 1, user_id: 2, comment: 'Are you kidding? it\'s surgery man..', updated_at: Date.now()};
        this.comments[3] = {id: 3, discussion_id: 1, reply_to_comment_id: 2, user_id: 3, comment: 'look like ladyboy..but skinnier', updated_at: Date.now()};
        this.comments[4] = {id: 4, discussion_id: 1, reply_to_comment_id: 0, user_id: 4, comment: 'I like skirt more', updated_at: Date.now()};
        this.comments[5] = {id: 5, discussion_id: 1, reply_to_comment_id: 4, user_id: 1, comment: 'totally agree!', updated_at: Date.now()};
    },

    //id and qid in this application will be the same value
    findByQid: function(id) {
        var qid = parseInt(id);
        var returnQuestion = this.questions[qid];
        if(qid === Object.keys(this.questions).length)
            returnQuestion.nextQuestion = this.questions[1];
        else returnQuestion.nextQuestion = this.questions[qid+1];

        return returnQuestion;
    },

    findAll: function() {
        return this.questions;
    },

    findByName: function(key) {
        var results = [];
        for (var id in this.questions) {
            if ( (this.questions[id].questionText + " " + this.questions[id].answerText).toLowerCase().indexOf(key.toLowerCase()) >= 0) {
                results.push(this.questions[id]);
            }
        }
        return results;
    },

    findDiscussions: function(program_id) {
        var results = [];
        for (var id in this.discussions) {
            if ( this.discussions[id].program_id === parseInt(program_id)) {
                results.push(this.discussions[id]);
            }
        }
        return results;
    },

    findDiscussionById: function(discussion_id) {
        return this.discussions[discussion_id];
    },

    findComments: function(discussion_id) {
        var results = [];
        for (var id in this.comments) {
            if ( this.comments[id].discussion_id === parseInt(discussion_id)) {
                results.push(this.comments[id]);
            }
        }
        return results;
    },

    saveAnswer: function(modified_model) {
        this.questions[modified_model.id].answerText = modified_model.get('answerText');
        this.questions[modified_model.id].isAnswered = modified_model.get('isAnswered');
    }, 

    createDiscussion: function(program_id, discussion, user_id) {
        var numDiscussions = Object.keys(this.discussions).length;
        this.discussions[numDiscussions+1] = {  id: numDiscussions+1, 
                                                program_id: program_id,
                                                user_id: user_id, 
                                                discussion: discussion,
                                                updated_at: Date.now()
                                            }
    }
}

store.populate();