class CreateDiscussions < ActiveRecord::Migration
  def change
    create_table :discussions do |t|
      t.integer :program_id
      t.integer :user_id
      t.string :title
      t.boolean :deleted

      t.timestamps
    end
  end
end
