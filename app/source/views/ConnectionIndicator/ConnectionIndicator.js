enyo.kind({
	name: "Coffee.ConnectionIndicator",
	classes: "connection-indicator",
	components: [
		{content: "online", name: "on", classes: "on"},
		{content: "offline", name: "off", classes: "off"},
		{kind: "Signals", onconnect: "connect", ondisconnect: "disconnect"}
	],
	published: {
		connected: false
	},
	connectedChanged: function(){
		this.addRemoveClass("on", this.connected);
		this.addRemoveClass("off", !this.connected);
	},
	connect: function(){
		console.log("setConnected true")
		this.setConnected(true);
	},
	disconnect: function(){
		console.log("setConnected false")
		this.setConnected(false);
	}
});
