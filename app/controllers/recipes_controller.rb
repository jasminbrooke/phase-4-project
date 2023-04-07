class RecipesController < ApplicationController

    def index
        if params[:user_id] # if a user id was submitted, we're in a nested route /users/:user_id/recipes
            user = User.find_by!(id: params[:user_id])
            render json: user.recipes
        else
            recipes = Recipe.all 
            render json: recipes
        end
    end

    def show
        recipe = Recipe.find_by!(id: params[:id])
        render json: recipe
    end

    def create
        recipe = Recipe.create(recipe_params)
        if recipe.valid?
            ingredients = params[:ingredients].map{ |id| Ingredient.find(id) }
            ingredients.each { |ingredient| recipe.ingredients << ingredient }
            render json: recipe, status: :created
        else
            render json: { errors: recipe.errors.full_messages }, status: :unprocessable_entity
        end
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
