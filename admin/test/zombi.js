var
	Browser = require("zombie"),
	expect = require('expect.js'),
	request = require("request"),
//	url = "http://coffee:coffee@localhost:1234/admin/",
	url = process.env.MAKE_COV_ADMIN ? "http://coffee:coffee@localhost:1234/admin/test-coverage.html" : "http://coffee:coffee@localhost:1234/admin/"//,
//	url = "http://coffee:coffee@localhost:1234/admin/test-coverage.html"
;

// start server
require("../../app");

// start browser
var browser = new Browser();

// visit interface, init promise
var p = browser.visit(url);

describe("a user", function() {
	this.timeout(50000);

	it("can be added", function(done) {
		p.then(function () {
			expect( browser.querySelectorAll("#users tr") ).to.have.length(0);
		})
		.then(function () {
			return browser
				.fill("#add-user input", "Klaus")
				.pressButton("#add-user .btn-primary");
		})
		.then(function () {
			expect( browser.querySelectorAll("#users tr") ).to.have.length(1);
		})
		.then(done, done);
	});

	it("cannot be added twice", function(done) {
		p.then(function () {
			return browser
				.fill("#add-user input", "Klaus")
				.pressButton(".btn-primary");
		})
		.then(function () {
			expect(browser.querySelectorAll("#users tr")).to.have.length(1);
		})
		.then(done, done);
	});

	it("is sorted correctly when added", function(done) {
		p.then(function () {
			return browser
				.fill("#add-user .name", "A")
				.pressButton("#add-user .btn-primary");
		})
		.then(function () {
			return browser
				.fill("#add-user .name", "Z")
				.pressButton("#add-user .btn-primary");
		})
		.then(function () {
			expect( browser.text("#users tr:nth-child(1) .name") ).to.be("A");
			expect( browser.text("#users tr:nth-child(2) .name") ).to.be("Klaus");
			expect( browser.text("#users tr:nth-child(3) .name") ).to.be("Z");
		})
		.then(done, done);
	});

	it("can be deleted", function(done) {
		p.then(function () {
			return browser.clickLink("#users tr .delete");
		})
		.then(function () {
			return browser.clickLink("#users tr .delete");
		})
		.then(function () {
			return browser.clickLink("#users tr .delete");
		})
		.then(function () {
			expect(browser.querySelectorAll("#users tr")).to.have.length(0);
		})
		.then(done, done);
	});

	it("is added in the interface when added on the server", function (done) {
		var url = "http://coffee:coffee@localhost:1234";
		var o = {
			uri:url+"/users",
			headers:{'content-type': 'application/x-www-form-urlencoded'},
			body:require('querystring').stringify( {name: "User"} )
		};

		request.post(o, function(err, body){
			setTimeout(function(){
				expect(browser.querySelectorAll("#users tr")).to.have.length(1);
				done();
			}, 1);
		});
	});

	it("is removed in the interface when removed from the server", function (done) {
		var url = "http://coffee:coffee@localhost:1234";

		request.del(url+"/users/User", function(err, body){
			setTimeout(function(){
				expect(browser.querySelectorAll("#users tr")).to.have.length(0);
				done();
			}, 1);
		});
	});
});



//beverages

describe("A beverage", function() {
		this.timeout(50000);
	it("can be added", function(done) {
		p.then(function () {
			expect( browser.querySelectorAll("#beverages tr") ).to.have.length(0);
		})
		.then(function () {
			return browser
				.fill("#add-beverage .name", "Klaus")
				.fill("#add-beverage .price", "0.20")
				.pressButton("#add-beverage .btn-primary");
		})
		.then(function () {
			expect( browser.text("#beverages tr .name") ).to.be("Klaus");
			expect( browser.text("#beverages tr .current-price") ).to.be("0,20€");
			expect( browser.querySelectorAll("#beverages tr") ).to.have.length(1);
		})
		.then(done, done);
	});

	it("cannot be added twice", function(done) {
		p.then(function () {
			return browser
				.fill("#add-beverage input", "Klaus")
				.pressButton(".btn-primary");
		})
		.then(function () {
			expect(browser.querySelectorAll("#beverages tr")).to.have.length(1);
		})
		.then(done, done);
	});

	it("can be changed", function(done) {
		p.then(function () {
			return browser.clickLink("#beverages tr:first-child .edit");
		})
		.then(function () {
			return browser
				.fill("#beverages tr:first-child input.price", ".4")
				.pressButton("#beverages tr:first-child .btn");
		})
		.then(function () {
			expect( browser.text("#beverages tr:first-child .name") ).to.be("Klaus");
			expect( browser.text("#beverages tr:first-child .current-price") ).to.be("0,40€");
		})
		.then(done, done);
	});

	it("is sorted correctly when added", function(done) {
		p.then(function () {
			return browser
				.fill("#add-beverage .name", "A")
				.fill("#add-beverage .price", ",4")
				.pressButton("#add-beverage .btn-primary");
		})
		.then(function () {
			return browser
				.fill("#add-beverage .name", "Z")
				.fill("#add-beverage .price", "0000,40000")
				.pressButton("#add-beverage .btn-primary");
		})
		.then(function () {
			expect( browser.text("#beverages tr:nth-child(1) .name") ).to.be("A");
			expect( browser.text("#beverages tr:nth-child(1) .current-price") ).to.be("0,40€");
			expect( browser.text("#beverages tr:nth-child(2) .name") ).to.be("Klaus");
			expect( browser.text("#beverages tr:nth-child(3) .name") ).to.be("Z");
			expect( browser.text("#beverages tr:nth-child(3) .current-price") ).to.be("0,40€");
		})
		.then(done, done);
	});

	it("can be deleted", function(done) {
		p.then(function () {
			return browser.clickLink("#beverages tr .delete");
		})
		.then(function () {
			return browser.clickLink("#beverages tr .delete");
		})
		.then(function () {
			return browser.clickLink("#beverages tr .delete");
		})
		.then(function () {
			expect(browser.querySelectorAll("#beverages tr")).to.have.length(0);
		})
		.then(done, done);
	});

	it("is added in the interface when added on the server", function (done) {
		var url = "http://coffee:coffee@localhost:1234";
		var o ={
			uri:url+"/beverages",
			headers:{'content-type': 'application/x-www-form-urlencoded'},
			body:require('querystring').stringify( {name: "Beverage", price: 0.1} )
		};

		request.post(o, function(err, body){
			setTimeout(function(){
				expect(browser.querySelectorAll("#beverages tr")).to.have.length(1);
				done();
			}, 1);
		});
	});

	it("is removed in the interface when removed from the server", function (done) {
		var url = "http://coffee:coffee@localhost:1234";

		request.del(url+"/beverages/Beverage", function(err, body){
			setTimeout(function(){
				expect(browser.querySelectorAll("#beverages tr")).to.have.length(0);
				done();
			}, 1);
		});
	});

	after(function(){
		_$jscoverage = browser.window._$jscoverage;
	});
});
