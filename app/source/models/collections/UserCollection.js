enyo.ready(function () {
	Coffee.UserCollection = Backbone.Collection.extend({
		model: Coffee.User,
		url: 'http://localhost:1234/users',
		comparator: function(user){
			return user.get('name');
		}
	});
});
