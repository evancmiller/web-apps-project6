class AddPlanController < ApplicationController
  before_action :authenticate_user!
  
  def get_majors
    @majors = Major.all
	@catalogs = Catalog.all
	response = { :majors => @majors, :catalogs => @catalogs }
	render :json => response 
  end
  
  def add_plan
    plan = Plan.new
	plan.user_id = current_user.id
	plan.name = params[:name]
	plan.major_id = params[:major]
	plan.catalog_id = params[:catalog]
	plan.save
  end

end
