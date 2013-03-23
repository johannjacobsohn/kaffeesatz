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

describe("The App", function () {
	it("has initially an empty beverage list", function () {
		expect( document.querySelectorAll(".beverage") ).to.have.length(0);
		expect( document.querySelectorAll(".user-row") ).to.have.length(0);
	});

	it("one beverage", function (done) {
		var x = new enyo.Ajax({url: url + "/beverages/", method: "post"});
		x.go({ name: 'Kaffee' });
		x.response(this, function(inSender, inResponse) {
			setTimeout(function(){
				expect( document.querySelectorAll(".beverage") ).to.have.length(1);
				expect( document.querySelectorAll(".user-row") ).to.have.length(0);
				done();
			}, 1);
		});
	});

	it("one user", function (done) {
		var x = new enyo.Ajax({url: url + "/users", method: "post"});
		x.go({ name: 'Paul' });
		x.response(this, function(inSender, inResponse) {
			setTimeout(function(){
				expect( document.querySelectorAll(".beverage") ).to.have.length(1);
				expect( document.querySelectorAll(".user-row") ).to.have.length(1);
				done();
			}, 1);
		});
	});

	it("two users, two beverages", function (done) {
		var x = new enyo.Ajax({url: url + "/beverages/", method: "post"});
		x.go({ name: 'B2' });
		x.response(this, function(inSender, inResponse) {
			var x = new enyo.Ajax({url: url + "/users/", method: "post"});
			x.go({ name: 'U2' });
			x.response(this, function(inSender, inResponse) {
				setTimeout(function(){
					expect( document.querySelectorAll(".beverage") ).to.have.length(2);
					expect( document.querySelectorAll(".user-row") ).to.have.length(4);
					done();
				}, 1);
			});
		});
	});


	it("tabbing an item", function(done){
		var firstRow = document.querySelector(".user-row");
		click(firstRow);
		setTimeout(function(){
			expect( firstRow.querySelector(".tally").getAttribute("class").split(" ") ).contain("tally-1");
			done();
		}, 100)
	});

/*
	it("tabbing an item on serverside", function(done){
		var url = "/users/Paul/B2"
		new enyo.Ajax({url: url, method: "POST"})
			.response(this, function(inSender, inResponse) {
				setTimeout(function(){
					console.log("exp")
					expect( document.querySelector(".user-row .tally").getAttribute("class").split(" ") ).contain("tally-2");
					done();
				}, 1000);
			})
			.go();
	});
*/
	// clearing an user serverside

//	item tabed on serverside

//	remove beverage & user
	
});
