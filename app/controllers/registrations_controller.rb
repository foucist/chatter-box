class RegistrationsController < Devise::RegistrationsController
  respond_to :html, :json

  def create
    super
    session[:omniauth] = nil unless @user.new_record?
  end

  def edit
    respond_with current_user.to_json(:methods => :token)
  end

  private

  def build_resource(*args)
    super
    if session[:omniauth]
      @user.apply_omniauth(session[:omniauth])
      @user.valid?
    end
  end
end
