class UsersController < ApplicationController

    def index
        users = User.all 
        render json: users
    end

    def show
        user = User.find_by(id: session[:user_id])
        if user
          render json: user
        else
          render json: { error: "Not authorized" }, status: :unauthorized
        end
    end

    def create
        user = User.new(user_params)
        if user.valid? # Set user_id in session hash if user is saved successfully
            session[:user_id] = user.id
            render json: user, status: :created
        else
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def update
        user = User.find_by!(id: params[:id])
        if user.update(user_params)
            render json: user
          else
            session.delete(:user_id) # Unset user_id if user fails to save
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
          end
    end

    def destroy
        user = User.find_by!(id: params[:id])
        if user.destroy
            render json: { message: "User deleted successfully" }, status: :deleted
          else
            render json: { error: user.errors.full_messages }, status: :unprocessable_entity
          end
    end

        
    private

    def user_params
        params.require(:user).permit(:name, :username, :password, :password_confirmation)
    end

end
