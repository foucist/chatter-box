Chatterbox::Application.routes.draw do
  # optional?  leave commented out for now
  #match 'login',  :to => 'users/sessions#new',      :as => "new_user_session"
  #match 'logout', :to => 'users/sessions#destroy',  :as => "destroy_user_session"
  #match 'signup', :to => 'users/registrations#new', :as => "new_user_registration"

  resources :twitter

  resources :discussions do
    resources :comments
  end

  match '/users/auth/:provider/callback' => 'authentications#create'
  devise_for :users, :controllers => { :registrations => 'registrations' }
  resources :authentications

  root :to => 'discussions#index'
end
