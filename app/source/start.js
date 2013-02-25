// Log errors with ErrorBoard (https://github.com/Lapple/ErrorBoard)
window.onerror = function( errorMsg, url, lineNumber ) {
	var e = encodeURIComponent;
	( new Image() ).src = "http://errorboard.eu01.aws.af.cm"+'/pusherror/?message=' + e( errorMsg ) + '&url=' + e( url ) + '&line=' + e( lineNumber );
};

enyo.ready(function () {
	enyo.Scroller.touchScrolling = true;
	var app = new Coffee.Application();
	app.render();
});
