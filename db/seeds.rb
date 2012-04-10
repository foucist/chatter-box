# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


Discussion.create(program_id: 1, user_id: 1, title: "Least likeable character?", deleted: false)
Comment.create(user_id: 1, discussion_id: 1, body: "Dom gets my vote. Just did not like him at all.", deleted: false)
Comment.create(user_id: 1, discussion_id: 1, body: "The season Ari was abusing Lloyd, I found Ari to be totally dispicable. He mellowed later, though, and I suppose Ari apologists would argue that he acted like a total prick for Lloyd's own good. I don't agree.", deleted: false)
Comment.create(user_id: 1, discussion_id: 1, body: "Mandy Moore...", deleted: false)
Comment.create(user_id: 1, discussion_id: 1, body: "I didn't like her either!", deleted: false)
Comment.create(user_id: 1, discussion_id: 1, body: "Easily Ashley. Easily.", deleted: false)

