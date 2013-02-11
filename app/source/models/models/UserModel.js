enyo.ready(function() {
	Coffee.User = Backbone.Model.extend({
		defaults: {
			name: 'Klaus',
			beverages: { Tee: 1, "Kaffee": 4 },
			correspondingBeverage: "Kaffee"
		},
		idAttribute: "_id", // MongoDB-Style
		url: function(){
			return 'http://localhost:1234/users/'+this.get("name")
		}
	});
});
