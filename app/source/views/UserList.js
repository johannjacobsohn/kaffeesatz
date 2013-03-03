enyo.kind({
	name: "Coffee.UserList",
	controller: "Coffee.UserCollectionController",
	kind: "Repeater",
	onSetupItem: "setupItem",
	bindings: [
		{from: ".controller.length", to: ".count"}
	],
	components: [
		{name: "item", kind: "Coffee.User"}
	],
	setupItem: function(inSender, inEvent){
		var index = inEvent.index;
		var item = inEvent.item.$.item;
		if(item){
			var model = this.controller.collection.at(index);
			model.set("correspondingBeverage", this.correspondingBeverage);
			enyo.log("setup user", model.get("name"), "at", this.correspondingBeverage );
			item.controller.set("model", model);
			return true;
		}
	}
});
