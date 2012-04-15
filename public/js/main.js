var AppRouter = Backbone.Router.extend({

    routes:{
        ""                      :   "login",
        "login"                 :   "login",
        "signup"                :   "signup",
        "select_channel"        :   "select_channel",
        "select_channel_auth"   :   "select_channel_auth",
        "channel/:channel_id"   :   "select_program",        //what is the program id?
        
        "program/:program_id"                   :   "show_program_activity", //what is the channel id? program id? 
        "program/:program_id/discussions"  :   "show_discussions",    //what show id this message board for?
        "program/:program_id/products"  :   "show_products", 
        "program/:program_id/chat"         :   "show_chat",

        "discussions/:program_id/add"       :   "add_discussion", 
        "discussion/:discussion_id"         :   "show_comments", 
        "discussion/:discussion_id/add"     :   "add_comment"
    },

    initialize: function() {

        var self = this;
        
        // Keep track of the history of pages (we only store the page URL). Used to identify the direction
        // (left or right) of the sliding transition between pages.
        this.pageHistory = [];
        this.activePage = null;
        this.loggedInUser = new User({id:1, username:'titaniummick',email:'mickey@mouse.com'});

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

        $('#content').on("click", ".add_discussion", function(event) {
            var programId = $('#programId').val(); 
            var newDiscussion = $('#discussionTopic').val();
            var discussion = new Discussion({
                program_id: parseInt(programId),
                discussion: newDiscussion,
                user_id: self.loggedInUser.get('id')
            });
            discussion.save();
            window.location = "#program/"+programId+"/show_discussions";
        }); 

        $('#content').on("click", "#add_comment", function(event) {
            var discussionId = $('#discussionId').val(); 
            var newComment = $('#topLevelCommentText').val();
            var comment = new Comment();
            comment.save({
                            discussion_id: parseInt(discussionId),
                            comment: newComment,
                            user_id: self.loggedInUser.get('id')
                        },
                        {
                            success: function(data) {
                               //add the new comment to CommentCollection
                               self.activePage.model.add(data);
                            }
                        });
        });

        //signing up
        $('#content').on("click", ".signupBtn", function(event) {
            event.preventDefault();
            var username = $('#username').val();
            var email = $('#email').val();
            var password = $('#password').val();
            var confirmPassword = $('#confirmPassword').val(); 

            if(password !== confirmPassword) {
                alert("Password and confirm password is different.");
                return; 
            }

            if(USING_RAILS_SERVER) {
                $.ajax({
                    type: 'post',
                    data: {"user":{"email":email,"username":username, "password": password, "password_confirmation":confirmPassword}},
                    dataType: 'json',
                    url: "/users.json",
                    success: function(response) {
                        self.loggedInUser = this.data;
                        window.location = "#select_channel"; //redirect
                    },
                    error: function(response) {
                      alert(response.responseText);
                    }
                  });
            } else { ////USING LOCAL MEMORY--always successfully create in this case
                var newUser = new User({username: username,email: email,password: password});
                store.createAccount(newUser);
                alert("successfully added it");
                self.loggedInUser = newUser;
                window.location = "#select_channel"; //redirect
            }
        });

        //logging in
        $('#content').on("click", ".loginBtn", function(event) {
            event.preventDefault();
            var usernameOrEmail = $('#loginEmail').val();
            var password = $('#loginPassword').val();

            //alert("signing up, username: "+username+",email: "+email+",password: "+password+",cf password: "+confirmPassword);
            var loggingInCandidate = new User({username:usernameOrEmail, password:password});
            var loggedInObj = null;

            if(USING_RAILS_SERVER) {
                $.ajax({
                    type: 'post',
                    data: {"user":{"login": usernameOrEmail, "password": password}},
                    dataType: 'json',
                    url: "/users/sign_in.json",
                    success: function(response) {
                        loggedInObj = response;
                        if(loggedInObj) {  //if cannot login, loggedInObj is 'false'
                            alert("successfully logged in");
                            var tmpLoggedInUser = new User();
                            tmpLoggedInUser.set(loggedInObj); //convert obj to backbone obj
                            self.loggedInUser = tmpLoggedInUser;
                            window.location = "#select_channel";
                        } else {
                            alert("dude...you can't remember your password?");
                            //not going anywhere
                        }
                    },
                    error: function(response) {
                        alert(response.responseText);
                        //not going anywhere
                    }
                  });
            } else {  //USING LOCAL MEMORY
                loggedInObj = store.authenticateAccount(usernameOrEmail,password);
                if(loggedInObj) {  //if cannot login, loggedInObj is 'false'
                    alert("successfully logged in");
                    var tmpLoggedInUser = new User();
                    tmpLoggedInUser.set(loggedInObj); //convert obj to backbone obj
                    self.loggedInUser = tmpLoggedInUser;
                    window.location = "#select_channel";
                } else {
                    alert("dude...you can't remember your password?");
                }
            } 
        });

        //checking in 
        $('#content').on("click", "#checkin", function(event) {
            event.preventDefault();
            var program_id = parseInt($('#spa_programIdStr').val());
            store.createNewCheckin(self.loggedInUser.get('id'),program_id)
        });
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
        var selectChannelPage = new SelectChannelPage(); 
        this.activePage = selectChannelPage; 
        this.slidePage(this.activePage.render());
    },   

    select_channel_auth:function() {
        var self = this;
            $.ajax({
              type: 'get',
              dataType: 'json',
              url: "/users/edit.json",
              success: function(response) {
                debugger;
              self.loggedInUser = response;
              window.location = "#select_channel"; //redirect
            },
            error: function(response) {
                     debugger;
                     alert(response.responseText);
                   }
            });
    },   

    select_program:function(channel_id_str) {
        var self = this;
        var channel_id = parseInt(channel_id_str);
        var programsCollection = new ProgramsCollection();
        programsCollection.channel_id = channel_id;
        programsCollection.fetch();
        var selectProgramPage = new SelectProgramPage({model: programsCollection});
        this.activePage = selectProgramPage; 
        this.slidePage(this.activePage.render());
    },   

    //helper function
    hasUserCheckedIn: function(checkedInUsers,loggedInUser) {
        for (var id in checkedInUsers) {
            if ( checkedInUsers[id].get('user_id') === loggedInUser.get('id')) {
                return true;
            }
        }
        return false;
    }, 

    show_program_activity:function(program_id_str) {
        var self = this;
        var program_id = parseInt(program_id_str);

        var program = new Program({id: program_id});
        program.fetch( {
            success:function (data) {
                var isUserCheckedIn = self.hasUserCheckedIn(data.get('checkInsCollection').models,self.loggedInUser);
                var showProgramActivityPage = new ShowProgramActivityPage({model:data, isUserCheckedIn:isUserCheckedIn});
                self.activePage = showProgramActivityPage;
                self.slidePage(self.activePage.render());
            }
        });
    },   

    show_discussions:function(program_id_str) {
        var self = this;
        program_id = parseInt(program_id_str);
        
// We keep a single instance of the DiscussionPage and its associated Discussion collection throughout the app<-- not the case
        var discussionsCollection = new DiscussionsCollection();
        discussionsCollection.program_id = program_id;
        
        discussionsCollection.fetch();
        //discussionsCollection.loadData(program_id);

        var discussionsPage = new ShowDiscussionsPage({model: discussionsCollection});

        this.activePage = discussionsPage; 
        this.slidePage(this.activePage.render());
    },

    add_discussion:function() {
        var self = this;
        var addDiscussionPage = new AddDiscussionPage() 
        this.activePage = addDiscussionPage; 
        this.slidePage(this.activePage.render());
        
    },      

    show_comments:function(discussion_id_str) {
        var self = this;
        discussion_id = parseInt(discussion_id_str);

        var discussion = new Discussion({id: discussion_id});
        discussion.fetch( {
            success:function (data) {
                var commentsCollection = new CommentsCollection(discussion_id);
                commentsCollection.fetch();
                var commentsPage = new ShowCommentsPage({
                                                            model:commentsCollection, 
                                                            discussion:data
                                                        });
                self.activePage = commentsPage;
                self.slidePage(self.activePage.render());
            }
        });
    },   

    show_products:function(program_id_str) {
        var self = this;
        this.slidePage(new ShowProductsPage().render());
    },   

    show_chat:function(program_id_str) {
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
                          'show_discussions', 'discussion-list-item','show_comments', 'comment-list-item',
                          'show_products', 'show_chat', 'add_discussion', 'program-list-item'
                        ],
        function () {
            app = new AppRouter();
            Backbone.history.start();
        });
});
