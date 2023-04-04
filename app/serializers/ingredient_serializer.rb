class IngredientSerializer < ActiveModel::Serializer
  attributes :id, :name
  
  has_many :recipes
  has_many :users
end
