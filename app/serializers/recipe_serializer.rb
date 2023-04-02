class RecipeSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :instructions, :user_id
end
