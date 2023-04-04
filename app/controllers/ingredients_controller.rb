class IngredientsController < ApplicationController

    def index
        if params[:user_id] # if a user id was submitted, we're in a nested route /users/:user_id/ingredients
            user = User.find_by!(id: params[:user_id])
            render json: user.ingredients
        else
            ingredients = Ingredient.all
            render json: ingredients
        end
    end

    def show
        ingredient = Ingredient.find_by!(id: params[:id])
        render json: ingredient
    end

    def create
        ingredient = Ingredient.new(ingredient_params)
        render json: ingredient
    end

    def update
        ingredient = Ingredient.find_by!(id: params[:id])
        if ingredient.update(ingredient_params)
            render json: ingredient 
        else
            render json: { error: ingredient.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        ingredient = Ingredient.find_by!(id: params[:id])
        if ingredient.destroy
            render json: { message: "Ingredient deleted successfully" }, status: :deleted
        else
            render json: { error: ingredient.errors.full_messages }, status: :unprocessable_entity
        end
    end

    private

    def user_params
        params.require(:ingredient).permit(:name)
    end
    
end
