class BottlesController < ApplicationController

	def index
    @bottles = Bottle.all
  end

  def new
    @bottle = Bottle.new
    @review = Review.new
  end

  def create
    @bottle = Bottle.new(bottle_params)
    if current_user == nil
      @bottle.save
      redirect_to bottle_path(@bottle), notice: "#{@bottle.name}!"
    else
      @bottle.save
      @review = Review.new(review_params)
      @review.save
      @review.user = current_user
      @bottle.reviews << @review
      redirect_to bottle_path(@bottle), notice: "#{@bottle.name}!"
    end
  end

  def show
     @bottle = Bottle.find(params[:id])
     if current_user != nil
      @review = Review.find(params[:id])
     end
  end
  
  def destroy
    @bottle = Bottle.find(params[:id])
    @bottle.destroy
    redirect_to root
  end

  def edit
    @bottle = Bottle.find(params[:id])
    if current_user != nil
      @review = @bottle.reviews.where(user_id: current_user.id).take
    end
  end

  def update
    @bottle = Bottle.find(params[:id])
    if current_user != nil 
      @review = @bottle.reviews.where(user_id: current_user.id).take
      if @bottle.update_attributes(bottle_params) && @review.update_attributes(review_params)
        redirect_to bottle_path(@bottle)
      end
    else
      @bottle.update_attributes(bottle_params)
      redirect_to bottle_path(@bottle)
    end
  end 

  protected

  def bottle_params
    params.require(:bottle).permit(:name, :grape, :vintage, :winery, :description)
  end

  def review_params
    params.require(:review).permit(:user_id, :bottle_id, :my_rating, :comment, :favorite)
  end
end