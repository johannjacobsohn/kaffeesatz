enyo.kind({
	name: "Coffee.RootView",
	layoutKind: "enyo.FittableRowsLayout",
	classes: "root",
	components: [
		{kind: "Image", src:"assets/kaffeesatzmedia.png", style: "display: block; margin: auto;"},
		{kind: "onyx.WebAppButton", installLabel: "Installieren", updateLabel: "Aktualisieren", style: "position: absolute; right: 4px; top: 4px;"},
		
		{kind: "Scroller", fit: true, components: [
			{kind: "Coffee.BeverageList"}
		]}
	]
});
