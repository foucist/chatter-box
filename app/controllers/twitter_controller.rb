class TwitterController < ApplicationController
  respond_to :html, :json
  #before_filter :confirm_twitter_auth
  before_filter :set_twitter_keys

  def index
    respond_with @tweets = Twitter.search("#entourage", :rpp => 10)
  end

  def create
    Twitter.update(params[:tweet] + " #entourage")
    #hack.. have to wait for twitter to update - idealy would do some ajax stuff later
    render :html => '/twitter/tweet'
    #render :text => params.inspect 
  end

  private
  def confirm_twitter_auth
    unless current_user.authentications.find_by_provider('twitter')
      redirect_to omniauth_authorize_path(:user, :twitter)
    end
  end

  def set_twitter_keys
    Twitter.configure do |config|
      if twitter_keys = current_user.authentications.find_by_provider('twitter')
        config.oauth_token = twitter_keys.token
        config.oauth_token_secret = twitter_keys.secret
      end
    end
  end

end
