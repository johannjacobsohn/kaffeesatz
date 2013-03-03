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
			enyo.log("connected, checking...");
			window.applicationCache.update();
		});

	enyo.Scroller.touchScrolling = true;

	var app = new Coffee.Application();
	app.render();
});
