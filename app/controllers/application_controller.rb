class ApplicationController < ActionController::API
  # before_action :authorize

  include ActionController::Cookies
  rescue_from ActiveRecord::RecordNotFound, with: ->(exception) { not_found_response(exception) }
  # This syntax "->(e) { method(e) }" allows us to pass the specific exception to our not found response
  # which will tell which resource we could not find the record for

  private

  def not_found_response(exception)
    render json: { errors: [exception.message]}, status: :not_found
  end

  def authorize
    return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
  end
end
