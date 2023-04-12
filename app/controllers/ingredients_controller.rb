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
        if params[:recipe_id] # this means we're posting an ingredient to a recipe  /recipes/:recipe_id/ingredients
            recipe = Recipe.find(params[:recipe_id])
            ingredient = Ingredient.find(params[:ingredient_id])
            if recipe.recipe_ingredients.create(ingredient_id: params[:ingredient_id], quantity: params[:quantity])
                # create the join record so it belongs to the recipe, and pass in the id of ingredient it belongs to, as well as the user-submitted quantity attribute that will live on the join record
                render json: recipe, status: :created
                # .as_json(include: { recipe_ingredients: { where: { recipe_id: params[:recipe_id] } } }), status: :created
                # trying to return the ingredient along with the join record that was just created, but it kept returning all of the recipe_ingredient records
            else
                render json: { errors: ['Failed to save quantity :('] }, status: :unprocessable_entity
            end
        else
            ingredient = Ingredient.create(ingredient_params)
            if ingredient.valid?
                render json: ingredient, status: :created
            else
                render json: { error: ingredient.errors.full_messages }, status: :unprocessable_entity
            end
        end
    end

    private

    def ingredient_params
        params.permit(:name)
    end
    
end
