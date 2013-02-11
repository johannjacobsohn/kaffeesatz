enyo.kind({
	name: "Coffee.ListView",
	controller: "Coffee.BeverageCollectionController",
	style: "height: 100%",
	layoutKind: "enyo.FittableRowsLayout",
	components: [
		{kind: "onyx.Toolbar", content: "Kaffeesatz(media)"},
		{name: "items", kind: "Scroller", fit: true}
	],
	handlers: {
		didload: "didload"
	},
	lengthChanged: function(){
		this.syncPanelsToCollection();
	},
	syncPanelsToCollection: function () {
		this.$.items.destroyClientControls();
		enyo.forEach(this.controller.models, function (model) {
			this.createItemForModel(model);
		}, this);

		this.render();
	},
	createItemForModel: function (model) {
		var item = this.$.items.createComponent( {kind: "Coffee.ListItem"} );
		item.controller.set("model", model);
	},
	bindings: [
		{from: ".controller.length", to: ".length"}
	]
});
