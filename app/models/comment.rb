class Comment < ActiveRecord::Base
  attr_accessible :body, :deleted, :discussion_id, :reply_to_id, :user_id
end
