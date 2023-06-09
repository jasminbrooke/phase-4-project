class UsersController < ApplicationController
  skip_before_action :authorize, only: [:show, :create]

  def show # get "/me" - checks if anyone is logged in and returns that user if found
    user = User.find_by(id: session[:user_id])
    if user
      render json: user
    else
      render json: { error: "Not authorized" }, status: :unauthorized
    end
  end

  def create
    user = User.create(user_params)
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
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    user = User.find_by!(id: params[:id])
    if user.destroy
      session.delete(:user_id) # log them out
      render json: { message: "User deleted successfully" }, status: :no_content
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.permit(:name, :username, :password, :password_confirmation)
  end
end
