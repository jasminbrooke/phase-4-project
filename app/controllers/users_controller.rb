class UsersController < ApplicationController

    def index
        users = User.all 
        render json: users
    end

    def show
        user = User.find_by(id: params[:id])
        render json: user
    end

    def create
        user = User.new(user_params)
        render json: user
    end

    def update
        user = User.find_by(id: params[:id])
        if user.update(user_params)
            render json: user
          else
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
          end
    end

    def destroy
        user = User.find_by(id: params[:id])
        user.destroy
        if user.destroy
            render json: { message: "User deleted successfully" }
          else
            render json: { error: user.errors.full_messages }, status: :unprocessable_entity
          end
    end

        
    private

    def user_params
        params.require(:user).permit(:name, :username, :password_digest)
    end

end
