class User < ApplicationRecord
    has_secure_password

    has_many :recipes
    has_many :user_ingredients
    has_many :ingredients, through: :user_ingredients

    validates :name, presence: true
    validates :username, uniqueness: true, presence: true
    # validates :password_digest, presence: true
end
