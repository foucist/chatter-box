class CommentsController < ApplicationController
  respond_to :html, :json
  before_filter :get_discussion

  def index
    @comments = @discussion.comments
    respond_with @comments
  end

  def show
    @comment = @discussion.comments.find(params[:id])
    respond_with @comment 
  end

  def new
    @comment = @discussion.comments.new
    respond_with @comment
  end

  def edit
    @comment = @discussion.comments.find(params[:id])
    respond_with @comment
  end

  def create
    @comment = @discussion.comments.new(params[:comment])
    flash[:notice] = '@discussion.comments was successfully created.' if @comment.save
    respond_with @comment
  end

  def update
    @comment = @discussion.comments.find(params[:id])
    flash[:notice] = '@discussion.comments was successfully updated.' if @comment.update_attributes(params[:comment])
    respond_with @comment
  end

  def destroy
    @comment = @discussion.comments.find(params[:id])
    @comment.destroy

    respond_to do |format|
      format.html { redirect_to comments_url }
      format.json { head :no_content }
    end
  end

  private
  def get_discussion
    @discussion = Discussion.find(params[:discussion_id])
  end
end
