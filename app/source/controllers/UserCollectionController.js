enyo.kind({
	name: "Coffee.UserCollectionController",
	kind: "enyo.CollectionController",
	collection: "Coffee.UserCollection",
	autoLoad: true,
	didload: function(){
		this.listenToSocket();
	},
	listenToSocket: function(){
		Coffee.socket
			.on("userChanged", function(user){
				var model = this.collection.get(user._id);
				model.set(user);
			}.bind(this))
			.on("userAdded", this.collection.add.bind(this.collection) )
			.on('userDeleted', this.collection.remove.bind(this.collection))
		;
	}
});
