class Comment < ActiveRecord::Base
  attr_accessible :body, :deleted, :discussion_id, :user_id, :program_id
  belongs_to :discussions
  def comment=(comment)
    self.body = comment
  end

  def comment
    self.body
  end
end
