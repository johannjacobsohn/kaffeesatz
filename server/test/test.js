/**
 * 
 *   
 */
var request = require("request"),
	expect = require('expect.js'),
	server = require("../server.js"),
	url = "http://localhost:1234";
	
	var databaseUrl = "coffeedb";
	var collections = ["beverages", "users"];
	var db = require("mongojs").connect(databaseUrl, collections);
	db.users.drop()

describe( "server: GET /", function(){
	it( "returns no users when non have been created", function(done){
		request(url, function(err, body){
			expect(body).to.not.be(undefined);
			var res = JSON.parse(body.body);
			expect(err).to.be(null);
			expect(res).to.be.an("array");
			expect(res).to.be.empty();
			done();
		});
	});
});

describe( "server: POST /{user}", function(){
	it( "adds a user", function(done){
		request.post(url+"/Klaus", function(err, body){
			var res = JSON.parse(body.body);
			expect(res.err).to.be(null);

			request(url, function(err, body){
				expect(body).to.not.be(undefined);
				var res = JSON.parse(body.body);
				expect(err).to.be(null);
				expect(res).to.be.an("array");
				expect(res).to.not.be.empty();
				done();
			});
		});
	});
});

describe( "server: POST /{user}", function(){
	it( "adds another user with the same name and triggers an error", function(done){
		request.post(url+"/Klaus", function(err, body){
			expect(err).to.be(null);
			var res = JSON.parse(body.body);
			expect(res.err).to.not.be(null);
			request(url, function(err, body){
				expect(body).to.not.be(undefined);
				var res = JSON.parse(body.body);
				expect(err).to.be(null);
				expect(res).to.be.an("array");
				expect(res).to.have.length(1);
				done();
			});
		});
	});
});

describe( "server: GET /", function(){
	it( "returns one users when one has been created", function(done){
		request(url, function(err, body){
			expect(body).to.not.be(null);
			var res = JSON.parse(body.body);
			expect(err).to.be(null);
			expect(res).to.be.an("array");
			expect(res).to.have.length(1);
			expect(res[0].name).to.be("Klaus");
			expect(res[0].beverages).to.be(undefined);
			done();
		});
	});
});

describe( "server: GET /beverages", function(){
	it( "gets a list of available beverages", function(done){
		request(url+"/beverages", function(err, body){
			expect(body).to.not.be(null);
			var res = JSON.parse(body.body);
			expect(err).to.be(null);
			expect(res).to.be.an("array");
			expect(res).to.not.be.empty();
			done();
		});
	});
});

describe( "server: POST /{{user}}/{{beverages}}", function(){
	it( "adds a beverage to an user, returns user", function(done){
		request.post(url+"/Klaus/Espresso", function(err, body){
			expect(err).to.be(null);
			var returned = JSON.parse(body.body);
			expect(returned.beverages).to.eql({Espresso: 1});
			expect(returned.name).to.be("Klaus");

			request(url, function(err, body){
				expect(err).to.be(null);
				var res = JSON.parse(body.body);
				expect(res[0]).to.eql(returned);
				done();
			});
		});
	});
});

describe( "server: PUT /{{user}}/clear", function(){
	it( "clears out a users beverage list", function(done){
		request.put(url+"/Klaus/clear", function(err, body){
			expect(err).to.be(null);
			var returned = JSON.parse(body.body);
			expect(returned.beverages).to.be(undefined);
			expect(returned.name).to.be("Klaus");

			request(url, function(err, body){
				expect(err).to.be(null);
				var res = JSON.parse(body.body);
				expect(res[0]).to.eql(returned);
				done();
			});
		});
	});
});


describe( "server: DELETE /{{user}}", function(){
	it( "deletes a user", function(done){
		request.del(url+"/Klaus", function(err){
			expect(err).to.be(null);
			request(url, function(err, body){
				expect(err).to.be(null);
				var res = JSON.parse(body.body);

				expect(err).to.be(null);
				expect(res).to.be.an("array");
				expect(res).to.be.empty();
				done();
			});
		});
	});
});

