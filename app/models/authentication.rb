class Authentication < ActiveRecord::Base
  belongs_to :user
  attr_accessible :provider, :uid, :token, :secret
  validates :provider, :presence => true, :uniqueness => { :scope => :user_id }

  def provider_name
    provider == 'open_id' ? "OpenID" : provider.titleize
  end
end
