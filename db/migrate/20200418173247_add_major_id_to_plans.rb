class AddMajorIdToPlans < ActiveRecord::Migration[6.0]
  def change
    add_column :plans, :major_id, :integer
  end
end
