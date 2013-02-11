enyo.ready(function () {
	Coffee.Beverages = Backbone.Collection.extend({
		model: Coffee.Beverage,
		url: 'http://localhost:1234/beverages',
		comparator: function(user){
			return user.get('name');
		}
	});
});
