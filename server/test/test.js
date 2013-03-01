/**
 * 
 *   
 */
var
	request = require("request"),
	expect = require('expect.js'),
	server = require("../server.js"),
	url = "http://coffee:coffee@localhost:1234";


describe( "users", function(){
	describe( "server: GET /users/", function(){
		it( "returns no users when non have been created", function(done){
			request(url+"/users/", function(err, body){
				expect(body).to.not.be(undefined);
				var res = JSON.parse(body.body);
				expect(err).to.be(null);
				expect(res).to.be.an("array");
				expect(res).to.be.empty();
				done();
			});
		});
	});

	describe( "server: POST /users/", function(){
		it( "adds a user", function(done){
			var o ={
				uri:url+"/users/Klaus",
				headers:{'content-type': 'application/x-www-form-urlencoded'},
				body:require('querystring').stringify( {name: "Klaus"} )
			};
			request.post(o, function(err, body){
				var res = JSON.parse(body.body);
				expect(res.err).to.be(null);

				request(url+"/users", function(err, body){
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

	describe( "server: POST /users/{user}", function(){
		it( "adds another user with the same name and triggers an error", function(done){
			var o ={
				uri:url+"/users/Klaus",
				headers:{'content-type': 'application/x-www-form-urlencoded'},
				body:require('querystring').stringify( {name: "Klaus"} )
			};
			request.post(o, function(err, body){
				expect(err).to.be(null);
				var res = JSON.parse(body.body);
				expect(res.err).to.not.be(null);
				request(url+"/users", function(err, body){
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

	describe( "server: GET /users", function(){
		it( "returns one users when one has been created", function(done){
			request(url+"/users/", function(err, body){
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

	describe( "server: GET /users/:user", function(){
		it( "returns one specific user", function(done){
			request(url+"/users/Klaus", function(err, body){
				expect(body).to.not.be(null);
				var res = JSON.parse(body.body);
				expect(err).to.be(null);
				expect(res).to.be.an("object");
				expect(res.name).to.be("Klaus");
				expect(res.beverages).to.be(undefined);
				done();
			});
		});
	});

	describe( "server: POST /users/{{user}}/{{beverages}}", function(){
		it( "adds a beverage to an user, returns user", function(done){
			request.post(url+"/users/Klaus/Espresso", function(err, body){
				expect(err).to.be(null);
				var returned = JSON.parse(body.body);
				expect(returned.beverages).to.eql({Espresso: 1});
				expect(returned.name).to.be("Klaus");

				request(url+"/users", function(err, body){
					expect(err).to.be(null);
					var res = JSON.parse(body.body);
					expect(res[0]).to.eql(returned);
					done();
				});
			});
		});
	});

	describe( "server: PUT /users/{{user}}", function(){
		it( "update a user but cannot change the name", function(done){
			
			var o = {
				uri:url+"/users/Klaus",
				headers:{'content-type': 'application/x-www-form-urlencoded'},
				body:require('querystring').stringify( {name: "Klaus2", beverages: {} } )
			};
			request.put(o, function(err, body){
				expect(err).to.be(null);
				var returned = JSON.parse(body.body);
				expect(returned.beverages).to.be.empty();
				expect(returned.name).to.be("Klaus");

				request(url+"/users", function(err, body){
					expect(err).to.be(null);
					var res = JSON.parse(body.body);
					expect(res[0]).to.eql(returned);
					done();
				});
			});
		});
	});

	describe( "server: DELETE /users/{{user}}", function(){
		it( "deletes a user", function(done){
			request.del(url+"/users/Klaus", function(err){
				expect(err).to.be(null);
				request(url+"/users", function(err, body){
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
});





describe( "beverages: ", function(){
	describe( "server: GET /beverages", function(){
		it( "gets a list of available beverages", function(done){
			request(url+"/beverages", function(err, body){
				expect(body).to.not.be(null);
				var res = JSON.parse(body.body);
				expect(err).to.be(null);
				expect(res).to.be.an("array");
				expect(res).to.be.empty();
				done();
			});
		});
	});

	describe( "server: POST /beverage/Kaffee", function(){
		it( "adds a beverage", function(done){
			var o = {
				uri:url+"/beverages/Kaffee",
				headers:{'content-type': 'application/x-www-form-urlencoded'},
				body:require('querystring').stringify( {name: "Kaffee", price: 0.99} )
			};
			request.post(o, function(err, body){
				var res = JSON.parse(body.body);

				request(url+"/beverages", function(err, body){
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

	describe( "server: PUT /beverages/{{beverage}}", function(){
		it( "update a beverage but cannot change the name", function(done){
			
			var o = {
				uri:url+"/beverages/Kaffee",
				headers:{'content-type': 'application/x-www-form-urlencoded'},
				body:require('querystring').stringify( {name: "Kaffee2", price: 1.30 } )
			};
			request.put(o, function(err, body){
				expect(err).to.be(null);
				var returned = JSON.parse(body.body);
				expect(returned.price).to.be(1.30);
				expect(returned.name).to.be("Kaffee");

				request(url+"/beverages", function(err, body){
					expect(err).to.be(null);
					var res = JSON.parse(body.body);
					expect(res[0]).to.eql(returned);
					done();
				});
			});
		});
	});

	describe( "server: GET /beverages/:beverage", function(){
		it( "returns one specific beverage", function(done){
			request(url+"/beverages/Kaffee", function(err, body){
				expect(body).to.not.be(null);
				var res = JSON.parse(body.body);
				expect(err).to.be(null);
				expect(res).to.be.an("object");
				expect(res.name).to.be("Kaffee");
				expect(res.price).to.be(1.30);
				done();
			});
		});
	});

	describe( "server: DELETE /beverages/:beverage", function(){
		it( "deletes a beverage", function(done){
			request.del(url+"/beverages/Kaffee", function(err){
				expect(err).to.be(null);
				request(url+"/beverages", function(err, body){
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
});
