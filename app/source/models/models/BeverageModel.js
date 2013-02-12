enyo.ready(function() {
	Coffee.Beverage = Backbone.Model.extend({
		defaults: {
			name: '',
			price: 0
		},
		idAttribute: "_id",
		url: function(){
			return '/beverages/'+this.get("name");
		}
	});
});

