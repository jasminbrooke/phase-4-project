class ApplicationController < ActionController::API
  include ActionController::Cookies
  rescue_from ActiveRecord::RecordNotFound, with: ->(exception) { not_found_response(exception) }
  # This syntax "->(e) { method(e) }" allows us to pass the specific exception to our not found response
  # which will tell which resource we could not find the record for

  private

  def not_found_response(exception)
    render json: { errors: [exception.message]}, status: :not_found
  end
end
