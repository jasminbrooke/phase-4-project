class RecipesController < ApplicationController

    def index
        recipes = Recipe.all 
        render json: recipes
    end

    def show
        recipe = Recipe.find_by!(id: params[:id])
        render json: recipe
    end

    def create
        recipe = Recipe.new(recipe_params)
        render json: recipe
    end

    def update
        recipe = Recipe.find_by!(id: params[:id])
        if recipe.update(recipe_params)
            render json: recipe
          else
            render json: { errors: recipe.errors.full_messages }, status: :unprocessable_entity
          end
    end

    def destroy
        recipe = Recipe.find_by!(id: params[:id])
            if recipe.destroy
                render json: { message: "Recipe deleted successfully" }, status: :deleted
            else
                render json: { error: recipe.errors.full_messages }, status: :unprocessable_entity
            end
    end
    
    private

  def recipe_params
    params.require(:recipe).permit(:name, :description, :instructions, :user_id)
  end

end
