enyo.kind({
	name: "Coffee.BeverageCollectionController",
	kind: "enyo.CollectionController",
	collection: "Coffee.Beverages",
	autoLoad: true
});

enyo.kind({
	name: "Coffee.testCollectionController",
	kind: "enyo.CollectionController",
	collection: "Coffee.UserCollection"
});

enyo.kind({
	name: "Coffee.UserController",
	kind: "enyo.ModelController",
	corresondingCount: enyo.Computed(function () {
		enyo.log("recalculate count");
		var count = "Ompalompa";
		if(this.data) {
			var correspondingBeverage = this.data.get("correspondingBeverage");
			var beverages = this.data.get("beverages");
			count = beverages[correspondingBeverage];
		}
		return count;
	}, "beverages", "beverageTap"),
	handlers: {
		ontap: "tabbing",
		didload: "didLoad"
	},
	didLoad: function(){
		enyo.log("didLoad Usercontroller!");
	},
	tabbing: function(){
		var beverages = this.data.get("beverages");
		var correspondingBeverage = this.data.get("correspondingBeverage");
		beverages[correspondingBeverage] = beverages[correspondingBeverage] || 0;
		beverages[correspondingBeverage]++;
		this.setBeverageTap(this.getBeverageTap()+1);
		this.set("beverages", beverages);
		this.data.save();
		return true;
	},
	published: {beverageTap:0},
	listenToSocket: function(){
		var that = this;
		var socket = io.connect('/');
		var name = 'usersChanged:' + this.get("name");
		enyo.log("listen to", name);
		socket.on("userChanged", function (data) {
			enyo.log("received userChanged", data.name, "is", that.get("name"));
			if(data.name === that.get("name")){
				that.set(data);
			}
		});
	},
	created: function(){
		this.listenToSocket();
	}
});

enyo.kind({
	name: "Coffee.BeverageController",
	kind: "enyo.ModelController"
});
