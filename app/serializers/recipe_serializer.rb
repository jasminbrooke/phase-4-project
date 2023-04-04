class RecipeSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :instructions, :user_id

  belongs_to :user
  has_many :ingredients
end
