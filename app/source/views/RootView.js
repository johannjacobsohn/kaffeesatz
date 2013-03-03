enyo.kind({
	name: "Coffee.RootView",
	layoutKind: "enyo.FittableRowsLayout",
	classes: "root",
	components: [
		{kind: "Image", src:"assets/kaffeesatzmedia.png", style: "display: block; margin: auto;"},
		{kind: "Scroller", fit: true, components: [
			{kind: "Coffee.BeverageList"}
		]}
	]
});
