class Location < ApplicationRecord
  has_many :sightings
  has_many :wildfires, through :sightings
end
