enyo.kind({
	name: "Coffee.ListView",
	controller: "Coffee.BeverageCollectionController",
	classes: "root",
	layoutKind: "enyo.FittableRowsLayout",
	components: [
		{classes: "innerwrapper", components: [
	//		{kind: "onyx.Toolbar", content: "Kaffeesatz(media)"},
			{kind: "Image", src:"assets/kaffeesatzmedia.png", style: "display: block; margin: auto;"},
			{name: "items", kind: "Scroller", fit: true, horizontal: "hidden"}
		]}	
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

