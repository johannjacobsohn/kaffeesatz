enyo.kind({
	name: "Coffee.RootView",
	components: [
		{classes: "root", kind: "enyo.FittableRows", components: [
			{kind: "Image", src:"assets/kaffeesatzmedia.png", style: "display: block; margin: auto;"},
			{kind: "onyx.WebAppButton", installLabel: "Installieren", updateLabel: "Aktualisieren", style: "position: absolute; right: 4px; top: 4px;"},
			{kind: "Coffee.ConnectionIndicator"},
			{kind: "Scroller", fit: true, components: [
				{kind: "Coffee.BeverageList"}
			]}
		]}
	]
});
