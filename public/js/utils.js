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

    questions: {},
    populate: function() {
        this.questions[1] = {id: 1, skoutUserId: 232, qid: 1, questionText: 'Who is your favorite superstar?', answerText: 'Mickey Mouse', isAnswered: '1', lastUpdated: null};
        this.questions[2] = {id: 2, skoutUserId: 232, qid: 2, questionText: 'What is your favorite sport?', answerText: '', isAnswered: '0', lastUpdated: null};
        this.questions[3] = {id: 3, skoutUserId: 232, qid: 3, questionText: 'Which country you most want to visit?', answerText: 'Peru', isAnswered: '1', lastUpdated: null};
        this.questions[4] = {id: 4, skoutUserId: 232, qid: 4, questionText: 'What is your favorite subject in highshool?', answerText: '', isAnswered: '0', lastUpdated: null};
        this.questions[5] = {id: 5, skoutUserId: 232, qid: 5, questionText: 'Pretty face or perfect body?', answerText: 'definitely for body', isAnswered: '1', lastUpdated: null};
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

    saveAnswer: function(modified_model) {
        this.questions[modified_model.id].answerText = modified_model.get('answerText');
        this.questions[modified_model.id].isAnswered = modified_model.get('isAnswered');
    }
}

store.populate();