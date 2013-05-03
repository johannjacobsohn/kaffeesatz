enyo.ready(function () {
	Coffee.Beverages = Backbone.Collection.extend({
		model: Coffee.BeverageModel,
		url: '/beverages',
		comparator: function(user){
			return user.get('name').toLowerCase();
		}
	});
});
