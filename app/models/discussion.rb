class Discussion < ActiveRecord::Base
  attr_accessible :deleted, :program_id, :title, :user_id
  has_many :comments
end