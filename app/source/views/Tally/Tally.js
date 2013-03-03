// http://jsfiddle.net/fGYcd/
enyo.kind({
	name: "Tally",
	kind: "Repeater",
	bgHeight : 20,
	bgVals : [
		[45, 25],
		[65, -35],
		[85, -115],
		[105, -215],
		[140, -360]
	],
	components: [
		{kind: "Repeater", name: "repeater", count: 1, onSetupItem: "setupItem", components: [
			{name: "mark", classes: "tally-mark"}
		]}
	],
	setupItem: function(inSender, inEvent) {
		var index = inEvent.index;
		var item = inEvent.item.$.mark;
		var scale = this.bgHeight/125;

		item.applyStyle("height", this.bgHeight + 'px');
		if( index < this.count-1 ){
			item.applyStyle("background-position", this.bgVals[4][1]*scale + "px 0");
			item.applyStyle("width", this.bgVals[4][0]*scale + 'px');
		} else { // last one
			var i = Math.max((this.number - index*5)%5 - 1, 0);
			i = this.number%5 === 0 ? 4 : i;
			item.applyStyle("background-position", this.bgVals[i][1]*scale + "px 0");
			item.applyStyle("width", this.bgVals[i][0]*scale + 'px');
		}

		return true;
	},
	published: {
		number : 1
	},
	numberChanged: function(){
		var c = Math.ceil(this.number/5);
		this.setCount( c );
		this.countChanged();
	}
});

