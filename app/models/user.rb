class User < ActiveRecord::Base
  mount_uploader :image, ImageUploader

  has_many :authentications

  attr_accessor :login
  # Setup accessible (or protected) attributes for your model
  attr_accessible :login, :username, :email, :password, :password_confirmation, :remember_me,
                  :authentication_token, :image, :image_cache, :remove_image

  validates_integrity_of  :image
  validates_processing_of :image

  devise :database_authenticatable, :registerable,  :trackable, 
         :recoverable, :rememberable, :omniauthable, :authentication_keys => [:login]

  def password_required?; false; end

  # for username OR email login
  def self.find_for_database_authentication(warden_conditions)
    conditions = warden_conditions.dup
    login = conditions.delete(:login)
    where(conditions).where(["lower(username) = :value OR lower(email) = :value", { :value => login.strip.downcase }]).first
  end

  # expected response?  oauth_verifier now..
  # oauth_token=Z6eEdO8MOmk394WozF5oKyuAv855l4Mlqo7hhlSLik&oauth_token_secret=Kd75W4OQfb2oJTV0vzGzeXftVAwgMnEK9MumzYcM&oauth_callback_confirmed=true
  def apply_omniauth(omniauth)
    case omniauth['provider']
    when 'facebook'
      self.apply_facebook(omniauth)
    when 'twitter'
      self.apply_twitter(omniauth)
    end
    authentications.build(hash_from_omniauth(omniauth))
  end

  def facebook
    @fb_user ||= FbGraph::User.me(self.authentications.find_by_provider('facebook').token)
  end

  def twitter
    unless @twitter_user
      provider = self.authentications.find_by_provider('twitter')
      @twitter_user = Twitter::Client.new(:oauth_token => provider.token, :oauth_token_secret => provider.secret) rescue nil
    end
    @twitter_user
  end

  def self.new_with_session(params, session)
    super.tap do |user|
      case session["omniauth"]['provider']
      when 'facebook'
        if data = session["omniauth"] && session["omniauth"]["extra"]["raw_info"]
          user.email = data["email"]
        end
      when 'twitter'
        if data = session["omniauth"]["info"]
          user.username = data["nickname"]
        end
      end
    end
  end

  protected

  def apply_facebook(omniauth)
    if (extra = omniauth['extra']['raw_info'] rescue false)
      self.email = (extra['email'] rescue '')
    end
  end

  def apply_twitter(omniauth)
    if (extra = omniauth['info'] rescue false)
      self.username = (extra["nickname"] rescue '')
      # Example fetching extra data. Needs migration to User model:
      # self.firstname = (extra['name'] rescue '')
    end
  end

  def hash_from_omniauth(omniauth)
    {
      :provider => omniauth['provider'], 
      :uid => omniauth['uid'], 
      :token => (omniauth['credentials']['token'] rescue nil),
      :secret => (omniauth['credentials']['secret'] rescue nil)
    }
  end


  #  def apply_omniauth(omniauth)
  #    self.email = extract_email(omniauth) if email.blank?
  #    authentications.build(:provider => omniauth['provider'], :uid => omniauth['uid'])
  #  end
  #
  #  private
  #
  #  def extract_email(omniauth)
  #    if omniauth['provider'] == 'facebook'
  #      omniauth['extra']['user_hash'].try(:[],'email')
  #    else
  #      omniauth['info']['email']
  #    end
  #  end
  #  user.name = auth["user_info"]["name"]
end

#  def self.find_for_facebook_oauth(access_token, signed_in_resource=nil)
#    data = access_token.extra.raw_info
#    if user = User.where(:email => data.email).first
#      user
#    else # Create a user with a stub password. 
#      User.create!(:email => data.email, :password => Devise.friendly_token[0,20], :authentication_token => access_token.credentials.token)
#    end
#  end
#
#
