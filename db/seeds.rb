# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)




Discussion.create(program_id: 1, user_id: 1, title: 'Do you think Aum looks hot in jeans?')
Discussion.create(program_id: 1, user_id: 1, title: 'How should the ending story be?')
Discussion.create(program_id: 1, user_id: 2, title: 'Why did Reya hit her mother?')
Discussion.create(program_id: 2, user_id: 3, title: 'Can we use ChatterBox to win the prize?')
Discussion.create(program_id: 2, user_id: 4, title: 'Is this gameshow too easy?')

Comment.create(discussion_id: 1, user_id: 1, body: 'Hell yeah! hot and sexy!')
Comment.create(discussion_id: 1, user_id: 2, body: 'Are you kidding? it\'s surgery man..')
Comment.create(discussion_id: 1, user_id: 3, body: 'look like ladyboy..but skinnier')
Comment.create(discussion_id: 1, user_id: 4, body: 'I like skirt more')
Comment.create(discussion_id: 1, user_id: 1, body: 'totally agree!')

Discussion.create(program_id: 1, user_id: 1, title: "Least likeable character?")

Comment.create(user_id: 1, discussion_id: 6, body: "Dom gets my vote. Just did not like him at all.")
Comment.create(user_id: 2, discussion_id: 6, body: "The season Ari was abusing Lloyd, I found Ari to be totally dispicable. He mellowed later, though, and I suppose Ari apologists would argue that he acted like a total prick for Lloyd's own good. I don't agree.")
Comment.create(user_id: 3, discussion_id: 6, body: "Mandy Moore...")
Comment.create(user_id: 1, discussion_id: 6, body: "I didn't like her either!")
Comment.create(user_id: 4, discussion_id: 6, body: "Easily Ashley. Easily.")
