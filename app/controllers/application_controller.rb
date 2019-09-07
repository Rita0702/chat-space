class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :authenticate_user!

  def confirure_permitted_paremeters
    devise_parameter_sanitizer.permit(:sing_up, keys: [:name])
  end
end
