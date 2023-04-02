class User < ApplicationRecord
    has_many :recipe
    has_many :ingredients
end
