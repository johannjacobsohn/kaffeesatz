enyo.kind({
	name: "Coffee.UserList",
	controller: "Coffee.UserCollectionController",
	bindings: [
		{from: ".controller.length", to: ".$.repeater.count"}
	],
	components: [
		{ kind: "Repeater", onSetupItem: "setupItem", components:[
			{name: "item", kind: "Coffee.User"}
		]}
	],
	setupItem: function(inSender, inEvent){
		var index = inEvent.index;
		if(inEvent.item){
			var item = inEvent.item.$.item;
			var model = this.controller.collection.at(index);
			model.set("correspondingBeverage", this.correspondingBeverage);
			enyo.log("setup user", model.get("name"), "at", this.correspondingBeverage );
			item.controller.set("model", model);
			return true;
		}
	}
});
