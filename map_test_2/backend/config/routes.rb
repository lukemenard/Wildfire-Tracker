Rails.application.routes.draw do
  resources :sightings
  resources :locations
  resources :wildfires

  patch '/wildfires/:id', to: "wildfires#update"
  delete '/wildfires/:id', to: "wildfires#destroy"

end
