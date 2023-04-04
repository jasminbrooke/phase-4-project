Rails.application.routes.draw do

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  resources :sessions, only: [:new, :create, :destroy]
  resources :ingredients, only: %i[create show index update delete]
  resources :recipes, only: %i[create show index update delete]
  resources :users, only: %i[create show index update delete] do
    resources :ingredients, only: %i[index]
  end
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
