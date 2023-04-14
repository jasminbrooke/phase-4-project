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
            ingredients = params[:ingredients]
            ingredients.each do |ing|
                id = ing[:ingredient_id] || ing[:id]
                old_record = recipe.recipe_ingredients.find_by(ingredient_id: id)
                old_record&.destroy
                result = recipe.recipe_ingredients.create(ingredient_id: id, quantity: ing[:quantity])
                # create the join record so it belongs to the recipe, and pass in the id of ingredient it belongs to, as well as the user-submitted quantity attribute that will live on the join record
                if result.nil?
                    render json: { errors: ['Failed to save :('] }, status: :unprocessable_entity
                end
            end
            render json: recipe, status: :created
        else
            ingredient = Ingredient.create(ingredient_params)
            if ingredient.valid?
                render json: ingredient, status: :created
            else
                render json: { errors: ingredient.errors.full_messages }, status: :unprocessable_entity
            end
        end
    end

    def update
        if params[:recipe_id] # we're in a nested route /recipes/:recipe_id/ingredients/:id updating a recipe_ingredient
            recipe = Recipe.find_by!(id: params[:recipe_id])
            if recipe.recipe_ingredients.find_by(ingredient_id: params[:id]).update(quantity: params[:quantity])
                render json: recipe, status: :ok
            else
                render json: { errors: ['Failed to update quantity :('] }, status: :unprocessable_entity
            end
        else
            ingredient = Ingredient.find_by!(id: params[:id])
            if ingredient.update(ingredient_params)
                render json: ingredient, status: :ok
            else
                render json: { errors: ingredient.errors.full_messages }, status: :unprocessable_entity
            end
        end
    end

    def destroy
        # this route is only for deleting recipe_ingredients, /recipes/:recipe_id/ingredients/:id
        recipe = Recipe.find_by!(id: params[:recipe_id])
        recipe_ingredient = recipe.recipe_ingredients.find_by(ingredient_id: params[:id])
        if recipe_ingredient.destroy
            render json: recipe, status: :ok
        else
            render json: { errors: ['Failed to remove ingredient :('] }, status: :unprocessable_entity
        end
    end

    private

    def ingredient_params
        params.permit(:name)
    end
    
end
