enyo.ready(function () {
	Coffee.Beverages = Backbone.Collection.extend({
		model: Coffee.Beverage,
		url: '/beverages',
		comparator: function(user){
			return user.get('name');
		}
	});
});
