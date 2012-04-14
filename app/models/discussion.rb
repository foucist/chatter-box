class Discussion < ActiveRecord::Base
  attr_accessible :deleted, :program_id, :title, :user_id, :discussion
  #alias_attribute :title, :discussion
  has_many :comments

  def discussion=(discussion)
    self.title = discussion
  end

  def discussion
    self.title
  end
end
