enyo.kind({
	name: "Coffee.RootView",
	components: [
		{classes: "root", kind: "enyo.FittableRows", components: [
			{kind: "Image", src:"assets/kaffeesatzmedia.png", style: "display: block; margin: auto; margin-top: 4px;"},
			{kind: "onyx.WebAppButton", installLabel: "Installieren", updateLabel: "Aktualisieren", style: "position: absolute; right: 4px; top: 4px;"},
			{kind: "Coffee.ConnectionIndicator"},
			{kind: "Coffee.BeverageList", fit: true}
		]}
	]
});
