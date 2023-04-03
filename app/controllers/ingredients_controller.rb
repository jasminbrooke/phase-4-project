class IngredientsController < ApplicationController

    def index
        ingredients = Ingredient.all
        render json: ingredients
    end

    def show
        ingredient = Ingredient.find_by(id: params[:id])
        render json: ingredient
    end

    def create
        ingredient = Ingredient.new(ingredient_params)
        render json: ingredient
    end

    def update
        ingredient = Ingredient.find_by(id: params[:id])
        if ingredient.update(ingredient_params)
            render json: ingredient 
        else
            render json: { error: ingredient.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        ingredient = Ingredient.find_by(id: params[:id])
        ingredient.destroy
        if ingredient.destroy
            render json: ingredient { message: "Ingredient deleted successfully" }
        else
            render json: { error: ingredient.errors.full_messages }, status: :unprocessable_entity
        end
    end

    private

    def user_params
        params.require(:ingredient).permit(:name)
    end
    
end
