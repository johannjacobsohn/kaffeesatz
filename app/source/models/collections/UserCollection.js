enyo.ready(function () {
	Coffee.UserCollection = Backbone.Collection.extend({
		model: Coffee.UserModel,
		url: '/users',
		comparator: function(user){
			return user.get('name').toLowerCase();
		}
	});
});
