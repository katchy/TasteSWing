class CreateTableRegions < ActiveRecord::Migration
  def change
    create_table :table_regions do |t|

    	t.string :region 

    end
  end
end
