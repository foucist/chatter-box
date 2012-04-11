class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.integer :user_id
      t.integer :discussion_id
      t.integer :program_id
      t.text :body
      t.boolean :deleted

      t.timestamps
    end
  end
end
