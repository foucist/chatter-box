// Overriding Backbone's sync method. We replace the default RESTful services-based implementation
// with a simple in-memory approach so that this sample doesn't have a dependency on remote services.
Backbone.sync = function (method, model, options) {
    switch (method) {
        case "read":
            if (model.id) {
                // Request to read a single item identified by its id.
                options.success(store.findByQid(model.id));
            } /*else if (model.managerId) {
                // Request to read a collection of employees identified by the manager they work for.
                options.success(store.findByManager(model.managerId));
            } */else {
                // Request to read a collection of all questions.
                options.success(store.findAll());
            }
            break;
        case "update":
            store.saveAnswer(model);
            break;
    }
};

var AppRouter = Backbone.Router.extend({

    routes:{
        ""                      :   "channel_select",
        "login"                 :   "login",
        "signup"                :   "signup",
        "select_channel"        :   "select_channel",
        "select_program"        :   "select_program",        //what is the program id?
        "show_program_activity" :   "show_program_activity", //what is the channel id? program id? 
        "show_discussion_board" :   "show_discussion_board",    //what show id this message board for?
        "show_discussion"       :   "show_discussion",
        "add_discussion_topic"  :   "add_discussion",
        "reply_to_discussion"   :   "reply_to_discussion",
        "show_program_merchandise": "show_program_merchandise",
        "show_chat"             :   "show_chat"
    },

    initialize: function() {

        var self = this;
        
        // Keep track of the history of pages (we only store the page URL). Used to identify the direction
        // (left or right) of the sliding transition between pages.
        this.pageHistory = [];

        // Register event listener for back button throughout the app
        $('#content').on('click', '.header-back-button', function(event){
            window.history.back();
            return false;
        });      

        // Check of browser supports touch events...
        if ('ontouchstart' in document.documentElement) {
            // ... if yes: register touch event listener to change the "selected" state of the item
            $('#content').on('touchstart', 'a', function(event){
                self.selectItem(event);
            });
            $('#content').on('touchend', 'a', function(event){
                self.deselectItem(event);
            });
        } else {
            // ... if not: register mouse events instead
            $('#content').on('mousedown', 'a', function(event){
                self.selectItem(event);
            });
            $('#content').on('mouseup', 'a', function(event){
                self.deselectItem(event);
            });
        }
    },

    selectItem:function(event) {
        $(event.target).addClass('tappable-active');
    },

    deselectItem:function(event) {
        $(event.target).removeClass('tappable-active');
    },

    

    list:function() {
        var self = this;
        this.slidePage(new LoginPage().render());
    },

    signup:function() {
        var self = this;
        this.slidePage(new SignupPage().render());
    },

    login:function() {
        var self = this;
        this.slidePage(new LoginPage().render());
    },

    select_channel:function() {
        var self = this;
        this.slidePage(new SelectChannelPage().render());
    },   

    select_program:function() {
        var self = this;
        this.slidePage(new SelectProgramPage().render());
    },   

    show_program_activity:function() {
        var self = this;
        this.slidePage(new ShowProgramActivityPage().render());
    },   

    show_discussion_board:function() {
        var self = this;
        this.slidePage(new ShowDiscussionBoardPage().render());
    },   

    show_discussion:function() {
        var self = this;
        this.slidePage(new ShowDiscussionPage().render());
    },   

    show_program_merchandise:function() {
        var self = this;
        this.slidePage(new ShowMerchandisePage().render());
    },   

    show_chat:function() {
        var self = this;
        this.slidePage(new ShowChatPage().render());
    },   

    slidePage:function(page) {

        if (!this.currentPage) {
            // If there is no current page (app just started) -> No transition: Position new page in the view port
            $(page.el).attr('class', 'page stage-center');
            $('#content').append(page.el);
            this.pageHistory = [window.location.hash];
            this.currentPage = page;
            return;
        }

        // Cleaning up: remove old pages that were moved out of the viewport
        $('.stage-right, .stage-left').remove();

        var slideFrom;
        if (page == this.homePage) {
            // Always apply a Back (slide from left) transition when we go back to the home page
            slideFrom = "left";
            $(page.el).attr('class', 'page stage-left');
            // Reinitialize page history
            this.pageHistory = [window.location.hash];
        } else if (this.pageHistory.length > 1 && window.location.hash === this.pageHistory[this.pageHistory.length - 2]) {
            // The new page is the same as the previous page -> Back transition
            slideFrom = "left";
            $(page.el).attr('class', 'page stage-left');
            this.pageHistory.pop();
        } else {
            // Forward transition (slide from right)
            slideFrom = "right";
            $(page.el).attr('class', 'page stage-right');
            this.pageHistory.push(window.location.hash);
        }

        $('#content').append(page.el);

        var self = this;

        // Wait until the new page has been added to the DOM...
        setTimeout(function() {
            // Slide out the current page: If new page slides from the right -> slide current page to the left, and vice versa
            $(self.currentPage.el).attr('class', 'page transition ' + (slideFrom == "right" ? 'stage-left' : 'stage-right'));
            // Slide in the new page
            $(page.el).attr('class', 'page stage-center transition');
            self.currentPage = page;
        });

    }

});

$(document).ready(function () {
    tpl.loadTemplates(  [ 'login','signup','select_channel','select_program','show_program_activity', 
                          'show_discussion_board', 'show_discussion', 'show_program_merchandise', 'show_chat'
                        ],
        function () {
            app = new AppRouter();
            Backbone.history.start();
        });
});