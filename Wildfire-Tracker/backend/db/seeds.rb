require 'json'
require 'net/http'
require 'active_support/core_ext/hash'
require 'rest-client'
require 'URI'
require 'nokogiri'
require 'xml/to/json'

Wildfire.destroy_all
Polygon.destroy_all

response = STR_XML = RestClient.get('https://inciweb.nwcg.gov/feeds/rss/incidents/')
scrape = Nokogiri::XML STR_XML
wildfires = scrape.xpath("//item")
wildfires.each do |wildfire|
  Wildfire.create(
    title: wildfire.children[0].children.text,
    latitude: wildfire.children[4].children.text.to_f,
    longitude: wildfire.children[5].children.text.to_f,
    link: wildfire.children[6].children.text,
    description: wildfire.children[8]
  )
end


Wildfire.create(
  title: "Test",
  latitude: 0,
  longitude: 0,
  link: "Test",
  description: "Test"
)



# polygon_response = RestClient.get('https://wildfire.cr.usgs.gov/ArcGIS/rest/services/geomac_dyn/MapServer/3')
# polygon_json = JSON.parse(polygon_response)
# binding.pry
