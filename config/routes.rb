Rails.application.routes.draw do
  # get 'messages/index'
  root 'messages#index'
  resources :messages, only: [:index]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
