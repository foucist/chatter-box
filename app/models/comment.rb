class Comment < ActiveRecord::Base
  attr_accessible :body, :deleted, :discussion_id, :user_id
  belongs_to :discussions
end
