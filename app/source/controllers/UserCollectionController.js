enyo.ready(function () {
	enyo.kind({
		name: "Coffee.UserCollectionController",
		kind: "enyo.CollectionController",
		collection: "Coffee.UserCollection",
		autoLoad: true,
		didload: function(){
			this.listenToSocket();
		},
		listenToSocket: function(){
			var that = this;
			Coffee.socket
				.on("userChanged", function(user){
					if(that.collection){
						var model = that.collection.get(user.name);
						model.set(user);
					}
				})
				.on("userAdded", function(user){
					if(that.collection){
						that.collection.add(user);
					}
				})
				.on('userDeleted', function(user){
					if(that.collection){
						that.collection.remove(user);
					}
				})
			;
		}
	});
});
