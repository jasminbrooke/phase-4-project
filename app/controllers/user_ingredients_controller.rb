class UserIngredientsController < ApplicationController

    def index
        user_ingredients = UserIngredient.where(user_id: session[:user_id])
        render json: user_ingredients, include: :ingredient
    end

    def update_or_create
        user_ingredient = UserIngredient.where(user_id: session[:user_id], ingredient_id: params[:ingredient_id]).first
        if user_ingredient
            user_ingredient.note += " | New Note: #{params[:note]}"
            if user_ingredient.save
                render json: user_ingredient, status: :created
            else
                render json: { errors: ["Something went wrong"] }, status: :unprocessable_entity
            end
        else
            user_ingredient = UserIngredient.create(user_ingredient_params)
            if user_ingredient.valid?
                render json: user_ingredient, status: :created
            else
                render json: { errors: user_ingredient.errors.full_messages }, status: :unprocessable_entity
            end
        end
    end

    private

    def user_ingredient_params
        params.permit(:user_id, :ingredient_id, :note)
    end
end