class CreateSightings < ActiveRecord::Migration[5.2]
  def change
    create_table :sightings do |t|
      t.references :wildfire, foreign_key: true
      t.references :location, foreign_key: true

      t.timestamps
    end
  end
end
