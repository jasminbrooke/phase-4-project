Rails.application.routes.draw do

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  get "/me", to: "users#show"
  post "/signup", to: "users#create"
  resources :sessions, only: [:new, :create, :destroy]
  resources :ingredients, only: %i[create show index update destroy]
  resources :recipes, only: %i[create show index update destroy]
  resources :users, only: %i[index update destroy] do
    resources :ingredients, only: %i[index create]
    resources :recipes, only: %i[index]
  end
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
