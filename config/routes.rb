Rails.application.routes.draw do

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  get "/me", to: "users#show"
  post "/signup", to: "users#create"
  post "/update_or_create", to: "user_ingredients#update_or_create"
  resources :sessions, only: [:new, :create, :destroy]
  resources :ingredients, only: %i[create show index update destroy]
  resources :recipes, only: %i[create show index update destroy]
  resources :users, only: %i[index update destroy] do
    resources :ingredients, only: %i[index create]
    resources :recipes, only: %i[index]
  end
  resources :user_ingredients, only: %i[index]
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
