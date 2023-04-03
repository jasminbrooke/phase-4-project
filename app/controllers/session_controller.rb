class SessionController < ApplicationController

  # def new
  #   user = User.find_by(username: params[:username])
  #   session[:user_id] = user.id
  #   render json: user
  # end

  def create
    user = User.find_by(username: params[:username])
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      render json: user
    else
      render json: { error: "Invalid username or password" }, status: :unprocessable_entity
    end
  end

  def destroy
    session.delete :user_id
    head :no_content
  end
  
end
