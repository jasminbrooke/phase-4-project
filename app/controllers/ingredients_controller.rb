class IngredientsController < ApplicationController

    def index
        ingredients = Ingredient.all
        render json: ingredients
    end

    def show
        ingredient = Ingredients.find_by(id: params[:id])
        render json: ingredient
    end

    def create
        ingredient = Ingredients.new(ingredient_params)
        render json: ingredient
    end

    def update
        ingredient = Ingredients.find_by(id: params[:id])
        render json: ingredient
    end

    def destroy
        ingredient = Ingredients.find_by(id: params[:id])
        ingredient.destroy
    end

    private

    def user_params
        params.require(:ingredient).permit(:name)
    end
    
end
