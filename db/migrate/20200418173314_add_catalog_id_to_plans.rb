class AddCatalogIdToPlans < ActiveRecord::Migration[6.0]
  def change
    add_column :plans, :catalog_id, :integer
  end
end
