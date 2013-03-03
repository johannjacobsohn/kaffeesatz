enyo.ready(function() {
	Coffee.BeverageModel = Backbone.Model.extend({
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

