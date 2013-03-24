enyo.kind({
	name: "Coffee.BeverageList",
	controller: "Coffee.BeverageCollectionController",
	bindings: [
		{from: ".controller.length", to: "$.repeater.count"}
	],
	components: [
		{kind: "Repeater", onSetupItem: "setupItem", components: [
			{name: "item", kind: "Coffee.Beverage"}
		]}
	],
	setupItem: function(inSender, inEvent){
		var index = inEvent.index;
		if(inEvent.item){
			var item = inEvent.item.$.item;
			var model = this.controller.collection.at(index);
			enyo.log("setup beverage", model.get("name") );
			item.controller.set("model", model);
			return true;
		}
	}
});

