var Browser = require("zombie");
var expect = require('expect.js')
var url = "http://coffee:coffee@localhost:1234/admin/";

require("../../server/server.js");

describe("a user", function() {
	var browser = new Browser();
	var p = browser.visit(url);
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
});



//beverages

describe("A beverage", function() {
	var browser = new Browser();
	var p = browser.visit(url);

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
			expect( browser.text("#beverages tr:first .name") ).to.be("Klaus");
			expect( browser.text("#beverages tr:first .current-price") ).to.be("0,20€");
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
			return browser.clickLink("#beverages tr:first-child .delete");
		})
		p.then(function () {
			return browser.clickLink("#beverages tr:first-child .delete");
		})
		p.then(function () {
			return browser.clickLink("#beverages tr:first-child .delete");
		})
		.then(function () {
			expect(browser.querySelectorAll("#beverages tr")).to.have.length(0);
		})
		.then(done, done);
	});
});
