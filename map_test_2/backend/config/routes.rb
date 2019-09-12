Rails.application.routes.draw do
  resources :polygons
  resources :sightings
  resources :locations
  resources :wildfires

  patch '/wildfires/:id', to: 'wildfires#update'
  delete '/wildfires/:id', to: 'wildfires#destroy'
  post '/wildfires', to: 'wildfires#create'

  post '/polygons', to: 'polygons#create'

end
