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

    programs: {},
    discussions: {},
    comments: {},
    users: {},

    populate: function() {
        this.users[1] = {id: 1, username: 'titaniummick', email: 'akavin@gmail.com', password: 'a', img:"mickey.png", fb_auth_token:"ssdd", tw_auth_token:"ddss"};
        this.users[2] = {id: 2, username: 'foucist', email: 'james@canada.com', password: 'j', img:"jamies.png", fb_auth_token:"ffgg", tw_auth_token:"ggff"};

        this.programs[1] = {id: 1, channel_id: 1,program: "Dok Som See Thong", tagline: "second scene", start_time: null, end_time: null, updated_at: (new Date()).getDate()-4};
        this.programs[2] = {id: 2, channel_id: 1,program: "Who want to be the millionaire?", tagline: "Jackpot round", start_time: null, end_time: null, updated_at: (new Date()).getDate()-4};
        this.programs[3] = {id: 3, channel_id: 1,program: "Prime Minister News", tagline: "Is Thailand prepare for next year?", start_time: null, end_time: null, updated_at: (new Date()).getDate()-4};
        this.programs[4] = {id: 4, channel_id: 1,program: "Master Key Game Show", tagline: "2kg of gold at stake", start_time: null, end_time: null, updated_at: (new Date()).getDate()-4};
        this.programs[5] = {id: 5, channel_id: 2,program: "CSI: Bangkok", tagline: "Who is the killer?", start_time: null, end_time: null, updated_at: (new Date()).getDate()-4};

        this.discussions[1] = {id: 1, program_id: 1, user_id: 1, discussion: 'What happens to Peter?', updated_at: Date.now()};
        this.discussions[2] = {id: 2, program_id: 1, user_id: 1, discussion: 'Who is your favorite character?', updated_at: Date.now()};
        this.discussions[3] = {id: 3, program_id: 1, user_id: 2, discussion: 'Season Finale?', updated_at: Date.now()};
        this.discussions[4] = {id: 4, program_id: 2, user_id: 3, discussion: 'Can we use ChatterBox to win the prize?', updated_at: Date.now()};
        this.discussions[5] = {id: 5, program_id: 2, user_id: 4, discussion: 'Is this gameshow too easy?', updated_at: Date.now()};

        this.comments[1] = {id: 1, discussion_id: 1, user_id: 1, comment: 'Hell yeah! hot and sexy!', updated_at: (new Date()).getDate()-4};
        this.comments[2] = {id: 2, discussion_id: 1, user_id: 2, comment: 'Are you kidding? it\'s surgery man..', updated_at: Date.now()};
        this.comments[3] = {id: 3, discussion_id: 1, user_id: 3, comment: 'look like ladyboy..but skinnier', updated_at: Date.now()};
        this.comments[4] = {id: 4, discussion_id: 1, user_id: 4, comment: 'I like skirt more', updated_at: Date.now()};
        this.comments[5] = {id: 5, discussion_id: 1, user_id: 1, comment: 'totally agree!', updated_at: Date.now()};    
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

    findByDiscussion: function(key, program_id) {
        var results = [];
        for (var id in this.discussions) {
            if (    (this.discussions[id].program_id === program_id )    &&
                    (this.discussions[id].discussion).toLowerCase().indexOf(key.toLowerCase()) >= 0) {
                results.push(this.discussions[id]);
            }
        }
        return results;
    },

    findPrograms: function(channel_id) {
        var results = [];
        for (var id in this.programs) {
            if ( this.programs[id].channel_id === parseInt(channel_id)) {
                results.push(this.programs[id]);
            }
        }
        return results;
    },

    findProgramById: function(program_id) {
        return this.programs[program_id];
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
    },

    createNewComment: function(discussion_id, comment, user_id) {
        var numComments = Object.keys(this.comments).length;
        this.comments[numComments+1] = {  id: numComments+1, 
                                                discussion_id: discussion_id,
                                                user_id: user_id, 
                                                comment: comment,
                                                updated_at: Date.now()
                                            };
        return this.comments[numComments+1];
    },

    createAccount: function(userModel) {
        var numUsers = Object.keys(this.users).length;
        this.users[numUsers+1] = {  id: numUsers+1, 
                                       username: userModel.get('username'),
                                       password: userModel.get('password'), 
                                       email: userModel.get('email')
                                   };
        return "success";
    },

    authenticateAccount: function(usernameOrEmail, password) {
        for (var id in this.users) {
            if ( (this.users[id].username === usernameOrEmail && this.users[id].password === password) ||
                 (this.users[id].email === usernameOrEmail && this.users[id].password === password)
                ) {
                return true;
            }
        }
        return false;
    }
}

store.populate();