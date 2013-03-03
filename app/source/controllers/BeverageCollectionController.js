enyo.kind({
	name: "Coffee.BeverageCollectionController",
	kind: "enyo.CollectionController",
	collection: "Coffee.Beverages",
	autoLoad: true,
	didload: function(){
		this.listenToSocket();
	},
	listenToSocket: function(){
		Coffee.socket
			.on("beverageChanged", function(beverage){
				var model = this.collection.get(beverage._id);
				model.set(beverage);
			}.bind(this))
			.on("beverageAdded", this.collection.add.bind(this.collection) )
			.on('beverageDeleted', this.collection.remove.bind(this.collection))
		;
	}
});
