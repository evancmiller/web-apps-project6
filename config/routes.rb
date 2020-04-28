Rails.application.routes.draw do
  resources :plans
  resources :add_plan
  devise_for :users, :controllers => {:registrations => 'registrations'}
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  resources :plans do
    collection do
       post 'add_course'
	   post 'remove_course'
	   post 'remove_plan'
	end
  end

  get '/get_majors' => 'add_plan#get_majors'
  post '/addplan' => 'add_plan#add_plan'

  root 'plans#index'
end
