class CreatePolygons < ActiveRecord::Migration[5.2]
  def change
    create_table :polygons do |t|
      t.string :title
      t.string :link
      t.string :description
      t.float :lat1
      t.float :long1
      t.float :lat2
      t.float :long2
      t.float :lat3
      t.float :long3
      t.float :lat4
      t.float :long4
      t.float :lat5
      t.float :long5
      t.float :lat6
      t.float :long6
      t.float :lat7
      t.float :long7
      t.float :lat8
      t.float :long8
      t.float :lat9
      t.float :long9
      t.float :lat10
      t.float :long10
      t.float :lat11
      t.float :long11
      t.float :lat12
      t.float :long12
      t.float :lat13
      t.float :long13
      t.float :lat14
      t.float :long14
      t.float :lat15
      t.float :long15
      t.references :wildfire, foreign_key: true

      t.timestamps
    end
  end
end
