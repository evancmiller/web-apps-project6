Rails.application.routes.draw do
  resources :plans
  devise_for :users, :controllers => {:registrations => 'registrations'}
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  resources :plans do
    collection do
       post 'add_course'
	   post 'remove_course'
	end
  end

  root 'plans#index'
end
