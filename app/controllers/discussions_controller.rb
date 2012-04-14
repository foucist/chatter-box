class DiscussionsController < ApplicationController
  #before_filter :authenticate_user!
  respond_to :html, :json

  def index
    @discussions = Discussion.all
    respond_with @discussions.to_json(:methods => :discussion)
  end

  def show
    @discussion = Discussion.find(params[:id])
    respond_with @discussion.to_json(:methods => :discussion)
  end

  def new
    @discussion = Discussion.new
    respond_with @discussion
  end

  def edit
    @discussion = Discussion.find(params[:id])
    respond_with @discussion
  end

  def create
    @discussion = Discussion.new(params[:discussion])
    flash[:notice] = 'Discussion was successfully created.' if @discussion.save
    respond_with @discussion
  end

  def update
    @discussion = Discussion.find(params[:id])
    flash[:notice] = 'Discussion was successfully updated.' if @discussion.update_attributes(params[:discussion])
    respond_with @discussion
  end

  def destroy
    @discussion = Discussion.find(params[:id])
    @discussion.destroy

    respond_to do |format|
      format.html { redirect_to discussions_url }
      format.json { head :no_content }
    end
  end
end
