var Browser = require("zombie");
var assert = require("assert");
var expect = require('expect.js')

require("../../server/server.js");

describe("add a user", function() {
	var browser = new Browser();
	var p = browser.visit("http://localhost:1234/admin/");

	it("works for the first one", function(done) {
		p.then(function () {
			assert.equal(browser.text("title"), "Kaffeesatz");
			assert.ok( !browser.query("#users tr") );
		})
		.then(function () {
			return browser.pressButton("#add-user");
		})
		.then(function () {
			return browser
				.fill("#user-modal input", "Klaus")
				.pressButton(".btn-primary");
		})
		.then(function () {
			assert.ok(browser.query("#users tr"))
		})
		.then(done, done);
	});

	it("is imposible to add the same user twice", function(done) {
		p.then(function () {
			return browser.pressButton("#add-user");
		})
		.then(function () {
			return browser
				.fill("#user-modal input", "Klaus")
				.pressButton(".btn-primary");
		})
		.then(function () {
			assert.equal(browser.querySelectorAll("#users tr").length, 1)
		})
		.then(done, done);
	});
});
