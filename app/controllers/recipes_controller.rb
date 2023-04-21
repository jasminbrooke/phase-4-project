class RecipesController < ApplicationController
    skip_before_action :authorize, only: [:search]

    def search
        recipes = Recipe.where('description LIKE ?', "%#{params[:search_term]}%")
        render json: recipes, status: :ok
    end

    def index
        if params[:user_id] # if a user id was submitted, we're in a nested route /users/:user_id/recipes
            user = User.find_by!(id: params[:user_id])
            recipes = user.recipes
        else
            recipes = Recipe.all 
        end
        render json: recipes, include: :ingredients
    end

    def create # creating user_recipes and recipe_ingredients
        user = User.find_by!(id: session[:user_id]) # find the user
        recipe = user.recipes.create(recipe_params) # create the recipe so that it belongs to the user
        if recipe.valid?
            render json: recipe, status: :created
        else
            render json: { errors: recipe.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def update
        # for updating recipes, or updating recipe_ingredients
        recipe = Recipe.find_by!(id: params[:id])
        
        if params[:ingredient_id] # we're in a nested route /ingredients/:ingredient_id/recipes/:id
            recipe.recipe_ingredients.update(ingredient_id: params[:ingredient_id], quantity: params[:quantity])
        else
            recipe.update(recipe_params) #updating name, description, instructions
        end

        if recipe.valid?
            render json: recipe, status: :ok
        else
            render json: { errors: recipe.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        recipe = Recipe.find_by!(id: params[:id])
        if recipe.destroy
            render json: { message: "Recipe deleted successfully" }, status: :no_content
        else
            render json: { error: recipe.errors.full_messages }, status: :unprocessable_entity
        end
    end
    
    private

  def recipe_params
    params.permit(:name, :description, :instructions, :user_id)
  end

end
