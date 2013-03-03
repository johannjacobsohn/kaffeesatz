enyo.kind({
	name: "Coffee.BeverageList",
	controller: "Coffee.BeverageCollectionController",
	kind: "Repeater",
	onSetupItem: "setupItem",
	bindings: [
		{from: ".controller.length", to: ".count"}
	],
	components: [
		{name: "item", kind: "Coffee.Beverage"}
	],
	setupItem: function(inSender, inEvent){
		var index = inEvent.index;
		var item = inEvent.item.$.item;
		if(item){
			var model = this.controller.collection.at(index);
			enyo.log("setup beverage", model.get("name") );
			item.controller.set("model", model);
			return true;
		}
	}
});

