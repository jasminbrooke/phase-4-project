class RecipeSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :instructions, :user_id, :ingredients_with_quantities

  belongs_to :user
  has_many :ingredients

  def ingredients_with_quantities
    # self.object.recipe_ingredients.includes(:ingredient)  -- does not show the through relationship, but is more efficient
    # self.object.ingredients = recipe.ingredients showing the "through" relationship
    self.object.ingredients.map do |ing| 
      {
        ingredient: ing,
        quantity: ing.recipe_ingredients.find_by(recipe_id: self.object.id)&.quantity || ''
      }
    end
  end
end
