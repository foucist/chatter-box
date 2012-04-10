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

//Collection
window.QuestionCollection = Backbone.Collection.extend({
    model: Question,

    loadData: function() {
        this.reset(store.findByName(" ")); //TODO: Fix this..find a better way
    }, 

    findByName:function (key) {
        this.reset(store.findByName(key));
    }
});


