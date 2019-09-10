class Sighting < ApplicationRecord
  belongs_to :wildfire
  belongs_to :location
end
