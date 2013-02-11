enyo.ready(function() {
	Coffee.Beverage = Backbone.Model.extend({
		defaults: {
			name: '',
			price: 0,
			users: []
		},
		idAttribute: "_id",
		url: function(){
			return 'http://localhost:1234/beverages/'+this.get("name")
//		},
//		initialize: function(){
//			this.users = new Coffee.Users();
//			console.log("init Beverages", this.users)
		}
	});
});

