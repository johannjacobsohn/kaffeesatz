// Log errors with ErrorBoard (https://github.com/Lapple/ErrorBoard)
window.onerror = function( errorMsg, url, lineNumber ) {
	var e = encodeURIComponent;
	( new Image() ).src = "http://errorboard.eu01.aws.af.cm"+'/pusherror/?message=' + e( errorMsg ) + '&url=' + e( url ) + '&line=' + e( lineNumber );
};

window.applicationCache.addEventListener("updateready", function(){
	enyo.log("updateready, reload...");
	window.applicationCache.swapCache();
	window.location.reload();
});

enyo.ready(function () {
	Coffee.socket = io.connect('/')
		.on("connect", function(){
			enyo.Signals.send("onconnect");
			try{
				window.applicationCache.update();
			}catch(e){}
		});
		.on("disconnect", enyo.Signals.send.bind(enyo.Signals, "ondisconnect") )
	;

	enyo.Scroller.touchScrolling = true;

	var app = new Coffee.Application();
	var el = document.getElementById("app");
	if(el) {
		app.renderInto( el );
	} else {
		app.render();
	}
});
