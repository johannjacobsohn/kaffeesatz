function click(el){
	if (el.fireEvent) {
		(el.fireEvent("onclick"));
	} else {
		var evObj = document.createEvent("MouseEvents");
		evObj.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		el.dispatchEvent(evObj);
	}
}

var url = "http://coffee:coffee@localhost:1234";
var base_url = url;
var post = function(url, data){
	return new enyo.Ajax({
		url: base_url + url,
		method: "POST",
		headers: { "Authorization": "Basic " + btoa("coffee:coffee") }
	}).go(data);
}

describe("The App", function () {
	it("has initially an empty beverage list", function () {
		expect( document.querySelectorAll(".beverage") ).to.have.length(0);
		expect( document.querySelectorAll(".user-row") ).to.have.length(0);
	});

	it("has one beverage when one beverage was added on the server", function (done) {
		post("/beverages", {"name": "Kaffee"})
			.response(this, function(inSender, inResponse) {
				setTimeout(function(){
					expect( document.querySelectorAll(".beverage") ).to.have.length(1);
					expect( document.querySelectorAll(".user-row") ).to.have.length(0);
					done();
				}, 1000);
			});
	});

	it("has one user when one was added on the server", function (done) {
		post("/users", {"name": "Paul"})
			.response(this, function(inSender, inResponse) {
				setTimeout(function(){
					expect( document.querySelectorAll(".beverage") ).to.have.length(1);
					expect( document.querySelectorAll(".user-row") ).to.have.length(1);
					done();
				}, 100);
		});
	});

	it("has two beverages and two users per beverage (=four) when two users and two beverages were added on the server", function (done) {
		post("/beverages", {"name": "B2"})
		post("/users", {"name": "U2"})

		setTimeout(function(){
			expect( document.querySelectorAll(".beverage") ).to.have.length(2);
			expect( document.querySelectorAll(".user-row") ).to.have.length(4);
			done();
		}, 1900);
	});
});

describe( "A user", function(){
	it("tabbing an item", function(done){
		var firstRow = document.querySelector(".user-row");
		click(firstRow);
		setTimeout(function(){
			expect( firstRow.querySelector(".tally").getAttribute("class").split(" ") ).contain("tally-1");
			done();
		}, 100)
	});

	it("tabbing an item on serverside", function(done){
		var url = "/users/Paul/B2"
		new enyo.Ajax({url: url, method: "POST", headers: { "Authorization": "Basic " + btoa("coffee:coffee") }})
			.response(this, function(inSender, inResponse) {
				setTimeout(function(){
					expect( document.querySelector(".user-row .tally").getAttribute("class").split(" ") ).contain("tally-2");
					done();
				}, 100);
			})
			.go();
	});

	it("clearing an user serverside", function(done){
		var url = "/users/Paul"
		new enyo.Ajax({url: url, method: "PUT", headers: { "Authorization": "Basic " + btoa("coffee:coffee") }})
			.response(this, function(inSender, inResponse) {
				setTimeout(function(){
					expect( document.querySelector(".user-row .tally").getAttribute("class").split(" ") ).contain("tally-0");
					done();
				}, 100);
			})
			.go({name: "Paul", beverages: {}});
	});


	it("removed users and beverages", function (done) {
		new enyo.Ajax({url: url + "/users/Paul", method: "delete", headers: { "Authorization": "Basic " + btoa("coffee:coffee") }}).go();
	
		setTimeout(function(){
			expect( document.querySelectorAll(".beverage") ).to.have.length(2);
			expect( document.querySelectorAll(".user-row") ).to.have.length(2);
			done();
		}, 1000);
	});

	it("removed users and beverages", function (done) {
		new enyo.Ajax({url: url + "/users/U2", method: "delete", headers: { "Authorization": "Basic " + btoa("coffee:coffee") }}).go();
		new enyo.Ajax({url: url + "/beverages/Kaffee", method: "delete"}).go();
		new enyo.Ajax({url: url + "/beverages/B2", method: "delete"}).go();
	
		setTimeout(function(){
			expect( document.querySelectorAll(".beverage") ).to.have.length(0);
			expect( document.querySelectorAll(".user-row") ).to.have.length(0);
			done();
		}, 100);
	});
});
