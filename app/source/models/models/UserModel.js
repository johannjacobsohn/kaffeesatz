enyo.ready(function() {
	Coffee.UserModel = Backbone.Model.extend({
		defaults: {
			name: 'Klaus',
			beverages: {},
			correspondingBeverage: "Kaffee"
		},
		idAttribute: "_id", // MongoDB-Style
		url: function(){
			return '/users/'+this.get("name");
		},
		sync: function(method, model, options){
			var url = "/users/"+model.get("name")+"/"+model.get("correspondingBeverage");
			new enyo.Ajax({url: url, method: "POST"})
				.go();
		},
		addBeverage: function( beverage ){
			var beverages = this.get("beverages");
			var correspondingBeverage = this.get("correspondingBeverage");
			beverages[correspondingBeverage] = beverages[correspondingBeverage] || 0;
			beverages[correspondingBeverage]++;
			this.trigger("change", this);
			this.save();
		}
	});
});
