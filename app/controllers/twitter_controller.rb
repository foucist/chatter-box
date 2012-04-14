class TwitterController < ApplicationController
  #layout 'application', :except => :tweet
  before_filter :set_twitter_keys

  def index
    @tweets = Twitter.search("#entourage", :rpp => 10)
  end

  def create
    Twitter.update(params[:tweet] + " #entourage")
    #hack.. have to wait for twitter to update - idealy would do some ajax stuff later
    render :html => '/twitter/tweet'
    #render :text => params.inspect 
  end

  private
  def set_twitter_keys
    Twitter.configure do |config|
      config.oauth_token = current_user.authentications.first.token
      config.oauth_token_secret = current_user.authentications.first.secret
    end
  end
end
