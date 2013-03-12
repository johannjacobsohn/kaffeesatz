;(function(){
	"use strict";
	var showing = false;
	$(".show-help").click(function(e){
		e.preventDefault();
		$(".help").popover( (showing = !showing) ? "show" : "hide" );
	});
}());

var socket = io.connect('/')
	.on("connect", function(){
		"use strict";
		$(".connected").show();
		$(".not-connected").hide();
	})
	.on("disconnect", function(){
		"use strict";
		$(".connected").hide();
		$(".not-connected").show();
	})
;

// Log errors with ErrorBoard (https://github.com/Lapple/ErrorBoard)
window.onerror = function( errorMsg, url, lineNumber ) {
	"use strict";
	var e = encodeURIComponent;
	( new Image() ).src = "http://errorboard.eu01.aws.af.cm"+'/pusherror/?message=' + e( errorMsg ) + '&url=' + e( url ) + '&line=' + e( lineNumber );
};

;(function(){
	"use strict";
	$(".install-app").toggle(!!navigator.mozApps).click(function(){
		var index = window.location.href.lastIndexOf("/"), url;
		if(index > window.location.href.indexOf("://")+2) {
			url = window.location.href.substring(0, index+1) + "manifest.webapp";
		} else {
			url = window.location.href + "/manifest.webapp";
		}
		var installRequest = navigator.mozApps.install(url);
		installRequest.onsuccess = function(){
			alert("wurde installiert!");
		};
		installRequest.onerror = function(){
			alert("konnte nicht installiert werden!");
		};
	});
	if(navigator.mozApps) {
		var request = navigator.mozApps.getSelf();
		request.onsuccess = function (response) {
			if(request.result){
				$(".install-app").hide();
			}
		};
	}
}());

/*
 * Zahlen in einen String formieren,
 * der zwei (oder precision) Nachkommastellen hat
 * und Komma als Dezimaltrennzeichen verwendet (nach SI)
 *
 * @TODO: Tests für andere Präzision
 * @example:
	formatNumberTest = function(){
		console.assert(formatNumber(07) === "7,00", "Führende Null");
		console.assert(formatNumber(121212128.1212121212) === "121212128,12", "Lange Zahl");
		console.assert(formatNumber("8,23") === "8,23", "String im korrekten Format");
		console.assert(formatNumber("8.235") === "8,24", "korrektes aufrunden");
		console.assert(formatNumber("8.234") === "8,23", "korrektes abrunden");
		console.assert(formatNumber("8") === "8,00", "Ganze Zahl als String");
		console.assert(formatNumber(0) === "0,00", "Null als Int");
		console.assert((formatNumber()).toString() === "0,00", "Kein Argument sollte 0,00 zurückgeben");
		console.assert((formatNumber("test").toString() === "NaN"), "Nicht parsebare Zahl sollte NaN zurückgeben");
	}
	formatNumberTest()
 * @param             n die zu formatierende Zahl - kann String, Int oder Float sein
 * @param  {{int}}    precision (optional) - Anzahl an Nachkommastellen, voreingestellt sind 2
 * @return {{string}} der formatierte String
 */
function formatNumber(n, precision){
	"use strict";
	precision = precision || 2;
	var p = Math.pow(10, precision);
	n = n || 0; // Test "Kein Argument sollte 0,00 zurückgeben; "
	n = parseFloat(n.toString().replace(",",".")); // Test "String im korrekten Format"
	n = Math.round(n * p)/p;
	return n.toFixed( precision ).toString().replace(".",",");
}
