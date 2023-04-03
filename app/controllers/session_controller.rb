class SessionController < ApplicationController

  def new
    user = User.find_by(username: params[:username])
    session[:user_id] = user.id
    render json: user
  end

  def create
    
  end

  def destroy
    session.delete :user_id
    head :no_content
  end
  

end
