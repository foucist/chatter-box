class AuthenticationsController < ApplicationController
  respond_to :html, :json
  def index
    respond_with @authentications = current_user.authentications if current_user
  end

  def create
    omniauth = request.env["omniauth.auth"]
    authentication = Authentication.find_by_provider_and_uid(omniauth['provider'], omniauth['uid'])
    if authentication
      flash[:notice] = "Signed in successfully."
      sign_in_and_redirect(:user, authentication.user)
    elsif current_user
      current_user.authentications.create!(:provider => omniauth['provider'], :uid => omniauth['uid'])
      flash[:notice] = "Authentication successful."
      redirect_to authentications_url
    else
      user = User.new
      user.apply_omniauth(omniauth)
      if user.save
        flash[:notice] = "Signed in successfully."
        sign_in_and_redirect(:user, user)
      else
        case request.env["omniauth.auth"]['provider']
        when 'facebook'
          session[:omniauth] = request.env["omniauth.auth"].except
        when 'twitter'
          session[:omniauth] = request.env["omniauth.auth"].except('extra')
        end
        redirect_to new_user_registration_url
      end
    end
  end
  private
  def sign_in_and_redirect(resource_or_scope, *args)
    options  = args.extract_options!
    scope    = Devise::Mapping.find_scope!(resource_or_scope)
    resource = args.last || resource_or_scope
    sign_in(scope, resource, options)
    redirect_to '/#select_channel_auth'
  end
end

#class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
#  def facebook
#    @user = User.find_for_facebook_oauth(request.env["omniauth.auth"], current_user)
#
#    if @user.persisted?
#      flash[:notice] = I18n.t "devise.omniauth_callbacks.success", :kind => "Facebook"
#      sign_in_and_redirect @user, :event => :authentication
#    else
#      session["devise.facebook_data"] = request.env["omniauth.auth"]
#      redirect_to new_user_registration_url
#    end
#  end
#end
