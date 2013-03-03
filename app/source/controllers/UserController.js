enyo.kind({
	name: "Coffee.UserController",
	kind: "enyo.ModelController",
	corresondingCount: enyo.Computed(function () {
		enyo.log("recalculate count");
		var count = "Ompalompa";
		if(this.data) {
			enyo.log("calculated", this.data.get("name"), this.data.get("correspondingBeverage"));
			var correspondingBeverage = this.data.get("correspondingBeverage");
			var beverages = this.data.get("beverages");
			count = beverages[correspondingBeverage];
		}
		return count;
	}, "beverages"),
	handlers: {
		ontap: "add"
	},
	add: function(){
		this.data.addBeverage();
	}
});
