class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :username

  has_many :recipes
  has_many :ingredients
end
