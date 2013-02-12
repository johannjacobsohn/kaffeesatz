//*@TODO: rename
enyo.kind({
	name: "Coffee.ListItem",
	controller: "Coffee.BeverageController",
	fit: true,
	bindings: [
		{from: ".controller.name", to: ".$.name.content"},
		{from: ".controller.name", to: ".$.users.correspondingBeverage"}
	],
	classes: "beverage",
	components: [
		{name: "name", fit: true, classes: "name",},
		{name: "users", kind: "Coffee.userList"}
	]
});

//*@TODO: Should be a repeater
//*@TODO: Move
enyo.kind({
	name: "Coffee.userList",
	controller: "Coffee.testCollectionController",
	components: [
		{name: "items"}
	],
	handlers: {
		didload: "didload",
		didchange: "didchange"
	},
	didchange: function(){},
	usersChanged: function(){
		console.log("received usersChanged");
		this.syncPanelsToCollection();
	},
	didload: function(){
		this.syncPanelsToCollection();
		this.didchange = this.syncPanelsToCollection;
	},
	syncPanelsToCollection: function () {
		this.$.items.destroyClientControls();
		console.warn(this.correspondingBeverage, this.controller.models.length)
		enyo.forEach(this.controller.models, function (model) {
			model.set("correspondingBeverage", this.correspondingBeverage);
			this.createItemForModel(model);
		}, this);
		this.render();
	},
	createItemForModel: function (model) {
		var item = this.$.items.createComponent({kind: "Coffee.item"});
		item.controller.set("model", model);
	},
	create: function(){
		this.inherited( arguments );
		//@TODO: Move to controller
		userList = this;
		this.controller.fetch();
	}
});

enyo.kind({
	name: "Coffee.item",
	controller: "Coffee.UserController",
	layoutKind: "enyo.FittableColumnsLayout",
	fit: true,
	classes: "user-row",
	bindings: [
		{from: ".controller.name", to: ".$.name.content"},
//		{from: ".controller.corresondingCount", to: ".$.corresondingCount.content"},
		{from: ".controller.corresondingCount", to: ".$.count.number"}
	],
	components: [
		{name: "name", classes: "name"},
//		{name: "corresondingCount", classes: "count"},
		{kind: "Tally", fit: true, name: "count", classes: "count", count: 1, number: 0}
	],
	create: function(){
		this.inherited(arguments);
		//@TODO: Move to controller
		this.controller.listenToSocket();
	}
});
