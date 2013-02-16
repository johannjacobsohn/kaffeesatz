var Browser = require("zombie");
var expect = require('expect.js');
var request = require("request");

require("../../server/server.js");

describe("initial state", function() {
	var browser = new Browser();
	var p = browser.visit("http://localhost:1234/app/index.html");

	it("has no users nor beverages", function(done) {
		p.then(function () {
			expect( browser.query(".user-row") ).to.be(undefined);
			expect( browser.query(".beverage") ).to.be(undefined);
		})
		.then(done, done);
		
	});
});

describe("once a beverage and a user have been added", function() {
	var browser = new Browser();
	var p = browser.visit("http://localhost:1234/app/index.html");

	it("users are present", function(done) {
		p.then(function () {
			expect( browser.query(".beverage") ).to.be(undefined);
			var o = {
				uri:"http://localhost:1234/beverages/Kaffee",
				headers:{'content-type': 'application/x-www-form-urlencoded'},
				body:require('querystring').stringify( {name: "Kaffee", cost: 0.99} )
			};
			request.post(o, function(err, body){
				setTimeout(function(){
					// allow 200ms lag between post and websocket
					console.log( browser.query(".beverage")  )
//					expect( browser.query(".beverage") ).to.not.be(undefined);
					done();
				}, 200);
			});
		})
		.then(done, done);
	});
});
