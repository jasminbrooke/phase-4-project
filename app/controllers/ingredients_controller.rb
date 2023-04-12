class IngredientsController < ApplicationController
    def index
        if params[:recipe_id] # if a recipe id was submitted, we're in a nested route /recipes/:recipe_id/ingredients
            recipe = Recipe.find_by!(id: params[:recipe_id])
            ingredients = recipe.ingredients
        else
            ingredients = Ingredient.all
        end
        render json: ingredients, include: :recipes
    end

    def create
        ingredient = Ingredient.create(ingredient_params)
        if ingredient.valid?
            render json: ingredient, status: :created
        else
            render json: { error: ingredient.errors.full_messages }, status: :unprocessable_entity
        end
    end

    private

    def ingredient_params
        params.permit(:name)
    end
    
end
