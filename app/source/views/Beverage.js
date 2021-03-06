enyo.kind({
	name: "Coffee.Beverage",
	controller: "Coffee.BeverageController",
	fit: true,
	bindings: [
		{from: ".controller.name", to: ".$.name.content"},
		{from: ".controller.name", to: ".$.users.correspondingBeverage"}
	],
	classes: "beverage",
	components: [
		{name: "name", classes: "name"},
		{name: "users", fit: true, kind: "Coffee.UserList"}
	]
});



