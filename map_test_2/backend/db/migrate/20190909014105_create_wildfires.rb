class CreateWildfires < ActiveRecord::Migration[5.2]
  def change
    create_table :wildfires do |t|
      t.string :title
      t.float :latitude
      t.float :longitude
      t.string :link
      t.text :description

      t.timestamps
    end
  end
end
