enyo.ready(function() {
	Coffee.User = Backbone.Model.extend({
		defaults: {
			name: 'Klaus',
			beverages: {},
			correspondingBeverage: "Kaffee"
		},
		idAttribute: "_id", // MongoDB-Style
		url: function(){
			return '/users/'+this.get("name")
		}
	});
});
