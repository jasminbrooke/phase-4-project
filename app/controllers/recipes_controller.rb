class RecipesController < ApplicationController

    def index
    end

    def show
    end

    def create
    end

    def update
    end

    def delete
    end
    
    private

  def recipe_params
    params.require(:recipe).permit(:name, :description, :instructions, :user_id)
  end

end
