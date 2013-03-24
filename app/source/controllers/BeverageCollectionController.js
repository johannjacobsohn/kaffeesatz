enyo.ready(function () {
	enyo.kind({
		name: "Coffee.BeverageCollectionController",
		kind: "enyo.CollectionController",
		collection: "Coffee.Beverages",
		autoLoad: true,
		didload: function(){
			this.listenToSocket();
		},
		listenToSocket: function(){
			var that = this;
			Coffee.socket
				.on("beverageChanged", function(beverage){
					if(that.collection){
						var model = that.collection.get(beverage.name);
						model.set(beverage);
					}
				})
				.on("beverageAdded", function(bev){
					if(that.collection){
						that.collection.add(bev);
					}
				})
				.on('beverageDeleted', function(user){
					if(that.collection){
						that.collection.remove(user);
					}
				})
			;
		}
	});
});
