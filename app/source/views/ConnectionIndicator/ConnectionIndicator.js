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
		this.setConnected(true);
	},
	disconnect: function(){
		this.setConnected(false);
	}
});
