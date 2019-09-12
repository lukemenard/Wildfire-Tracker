class PolygonsController < ApplicationController

    def index
      polygons = Polygon.all
      render json: polygons, except: [:updated_at, :created_at]
    end

    def create
      test = Wildfire.find_by(title: "Test")
      polygon = Polygon.create(
        title: params[:title],
        link: params[:link],
        description: params[:description],
        lat1: params[:lat1],
        long1: params[:long1],
        lat2: params[:lat2],
        long2: params[:long2],
        lat3: params[:lat3],
        long3: params[:long3],
        lat4: params[:lat4],
        long4: params[:long4],
        lat5: params[:lat5],
        long5: params[:long5],
        lat6: params[:lat6],
        long6: params[:long6],
        lat7: params[:lat7],
        long7: params[:long7],
        lat8: params[:lat8],
        long8: params[:long8],
        lat9: params[:lat9],
        long9: params[:long9],
        lat10: params[:lat10],
        long10: params[:long10],
        lat11: params[:lat11],
        long11: params[:long11],
        lat12: params[:lat12],
        long12: params[:long12],
        lat13: params[:lat13],
        long13: params[:long13],
        lat14: params[:lat14],
        long14: params[:long14],
        lat15: params[:lat15],
        long15: params[:long15],
        wildfire_id: test.id
      )
      render json: polygon, except: [:updated_at, :created_at]
    end

    def show
      polygon = Polygon.find_by(id: params[:id])
      render json: polygon, except: [:updated_at, :created_at]
    end

    def update
      polygon = Polygon.find_by(id: params[:id])
      polygon.update(polygon_params)
      render json: polygon, except: [:updated_at, :created_at]
    end

    def destroy
      polygon = Polygon.find_by(id: params[:id])
      polygon.delete
    end


    private

    def polygon_params
      params.require(:polygon).permit(:id,
        :wildfire_id,
        :title,
        :description,
        :link,
        :lat1,
        :long1,
        :lat2,
        :long2,
        :lat3,
        :long3,
        :lat4,
        :long4,
        :lat5,
        :long5,
        :lat6,
        :long6,
        :lat7,
        :long7,
        :lat8,
        :long8,
        :lat9,
        :long9,
        :lat10,
        :long10,
        :lat11,
        :long11,
        :lat12,
        :long12,
        :lat13,
        :long13,
        :lat14,
        :long14,
        :lat15,
        :long15
      )
    end

end
