class UserIngredient < ApplicationRecord
    belongs_to :user
    belongs_to :ingredient

    validates :user_id, :ingredient_id, presence: true
end
