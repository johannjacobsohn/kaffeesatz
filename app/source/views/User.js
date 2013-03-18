enyo.kind({
	name: "Coffee.User",
	controller: "Coffee.UserController",
	layoutKind: "enyo.FittableColumnsLayout",
	fit: true,
	classes: "user-row",
	bindings: [
		{from: ".controller.name", to: ".$.name.content"},
		{from: ".controller.corresondingCount", to: ".c"},
		{from: ".c", to: ".$.counter.content"},
		{from: ".c", to: ".$.count.number"}
	],
	components: [
		{name: "name", classes: "name"},
//		{name: "counter", classes: "count"},
		{kind: "Tally", fit: true, name: "count", classes: "count", number: 0}
	]
});
