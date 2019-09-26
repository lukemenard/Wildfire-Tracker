# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_09_12_201046) do

  create_table "locations", force: :cascade do |t|
    t.float "latitude"
    t.float "longitude"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "polygons", force: :cascade do |t|
    t.string "title"
    t.string "link"
    t.string "description"
    t.float "lat1"
    t.float "long1"
    t.float "lat2"
    t.float "long2"
    t.float "lat3"
    t.float "long3"
    t.float "lat4"
    t.float "long4"
    t.float "lat5"
    t.float "long5"
    t.float "lat6"
    t.float "long6"
    t.float "lat7"
    t.float "long7"
    t.float "lat8"
    t.float "long8"
    t.float "lat9"
    t.float "long9"
    t.float "lat10"
    t.float "long10"
    t.float "lat11"
    t.float "long11"
    t.float "lat12"
    t.float "long12"
    t.float "lat13"
    t.float "long13"
    t.float "lat14"
    t.float "long14"
    t.float "lat15"
    t.float "long15"
    t.integer "wildfire_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["wildfire_id"], name: "index_polygons_on_wildfire_id"
  end

  create_table "sightings", force: :cascade do |t|
    t.integer "wildfire_id"
    t.integer "location_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["location_id"], name: "index_sightings_on_location_id"
    t.index ["wildfire_id"], name: "index_sightings_on_wildfire_id"
  end

  create_table "wildfires", force: :cascade do |t|
    t.string "title"
    t.float "latitude"
    t.float "longitude"
    t.string "link"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
