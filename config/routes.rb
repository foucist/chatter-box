Chatterbox::Application.routes.draw do
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }

  # optional?  leave commented out for now
  #match 'login',  :to => 'users/sessions#new',      :as => "new_user_session"
  #match 'logout', :to => 'users/sessions#destroy',  :as => "destroy_user_session"
  #match 'signup', :to => 'users/registrations#new', :as => "new_user_registration"

  resources :discussions do
    resources :comments
  end

  root :to => 'discussion#index'
end
