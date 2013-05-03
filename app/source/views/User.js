enyo.kind({
	name: "Coffee.User",
	controller: "Coffee.UserController",
	fit: true,
	tag: "tr",
	classes: "user-row",
	bindings: [
		{from: ".controller.name", to: ".$.name.content"},
		{from: ".controller.corresondingCount", to: ".c"},
		{from: ".c", to: ".$.counter.content"},
		{from: ".c", to: ".$.count.number"}
	],
	components: [
		{name: "name", classes: "name", tag: "td"},
//		{name: "counter", classes: "count", tag: "td"},
		{kind: "Tally", fit: true, name: "count", classes: "count", number: 0, tag: "td"}
	]
});
