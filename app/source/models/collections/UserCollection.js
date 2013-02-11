enyo.ready(function () {
	Coffee.UserCollection = Backbone.Collection.extend({
		model: Coffee.User,
		url: '/users',
		comparator: function(user){
			return user.get('name');
		}
	});
});
