class WildfiresController < ApplicationController

  def index
    wildfires = Wildfire.all
    render json: wildfires, except: [:updated_at, :created_at]
  end

  def create
    wildfire = Wildfire.create(title: params[:title], latitude: params[:latitude], longitude: params[:longitude], link: params[:link], description: params[:description])
    render json: wildfire, except: [:updated_at, :created_at]
  end

  def show
    wildfire = Wildfire.find_by(id: params[:id])
    render json: wildfire, except: [:updated_at, :created_at]
  end

  def update
    wildfire = Wildfire.find_by(id: params[:id])
    wildfire.update(wildfire_params)
    render json: wildfire, except: [:updated_at, :created_at]
  end

  def destroy
    wildfire = Wildfire.find_by(id: params[:id])
    wildfire.delete
  end


  private

  def wildfire_params
    params.require(:wildfire).permit(:id, :title, :latitude, :longitude, :description, :link)
  end

end
