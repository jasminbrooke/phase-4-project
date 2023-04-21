Rails.application.routes.draw do

  get '/ingredients_by_letter/:letter', to: "ingredients#ingredients_by_letter"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  post "/signup", to: "users#create"
  get "/me", to: "users#show"
  post "/search", to: "recipes#search"
  resources :sessions, only: %i[create destroy]
  resources :users, only: %i[update destroy] do
    resources :recipes, only: %i[index create update destroy]
  end
  resources :ingredients, only: %i[create index] do
    resources :recipes, only: %i[index update]
  end
  resources :recipes, only: %i[create show index update destroy] do
    resources :ingredients, only: %i[index create update destroy]
  end
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
