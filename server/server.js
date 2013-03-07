/**
 * server.js
 *
 * Provides the backbone for the server part of the app
 * handles authentification and routing
 */
var
	express = require('express'),
	users = require("./users.js").users,
	beverages = require("./beverages.js").beverages,
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
	// https://gist.github.com/2344435
	allowCrossDomain = function(req, res, next) {
		"use strict";
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		res.header('Access-Control-Allow-Headers', 'X-Requested-With, Accept, Origin, Referer, User-Agent, Content-Type, Authorization, X-Mindflash-SessionID');
		// intercept OPTIONS method
		if ('OPTIONS' === req.method) {
			res.send(200);
		} else {
			next();
		}
	},
	// ultra-simple authentication as a proof of concept
	auth = express.basicAuth(function(user, pass, callback) {
		"use strict";
		var result = (user === 'coffee' && pass === 'coffee');
		callback(null, result);
	});

// since appfog doesn't support sockets force long polling ajax requests
if(process.env.VCAP_SERVICES){
	io.set('transports', ['xhr-polling']);
}
io.set('log level', 0);
io.set("browser client minification", true);

server.listen(process.env.VMC_APP_PORT || 1234);

app
 .use(allowCrossDomain)                  // allow access from other domains via CORS header
 .use(express.compress())                // use compression
 .use(express.bodyParser())

// static files
 .use("/app", express["static"](__dirname + '/../app'))
 .use("/admin", express["static"](__dirname + '/../admin'))

// REST-API:

// user
 .post("/users/:user/:beverage", function(req, res){
	"use strict";
	users.addBeverage(req.param("user"), req.param("beverage"), function(err, user){
		res.end( JSON.stringify(user) );
		io.sockets.emit('userChanged', user);
	});
 })
 .get ("/users", function(req, res){
	"use strict";
	users.list(function(err, users){
		res.end( JSON.stringify(users) );
	});
 })
 .get ("/users/:user", function(req, res){
	"use strict";
	users.get(req.param("user"), function(err, user){
		res.end( JSON.stringify(user) );
	});
 })
 .post("/users/:user", auth, function(req, res){
	"use strict";
	var user = { name : req.param("name") };
	users.add(user, function(err, savedUser){
		res.end(JSON.stringify(savedUser));
		io.sockets.emit('userAdded', savedUser);
	});
  })
 .del("/users/:user", auth, function(req, res){
	"use strict";
	var user = {name: req.param("user")};
	users.del(user, function(err, user){
		res.end("{}"); // backbone expects a result
		io.sockets.emit('userDeleted', user);
	});
  })
 .put ("/users/:user", auth, function(req, res){
	"use strict";
	var user = { name: req.params.user, beverages: req.body.beverages || {} };
	users.update(user, function(err, user){
		res.end(JSON.stringify(user));
		io.sockets.emit('userChanged', user);
	});
 })

// beverages
 .get ("/beverages", function(req, res){
	"use strict";
	beverages.list(function(err, beverage){
		res.end( JSON.stringify(beverage) );
	});
 })
 .get ("/beverages/:beverage", function(req, res){
	"use strict";
	var name = req.param("beverage");
	beverages.get(name, function(err, beverage){
		res.end( JSON.stringify(beverage) );
	});
 })
 .post("/beverages/:beverage", auth, function(req, res){
	"use strict";
	var beverage = {name: req.param("name"), price: parseFloat(req.param("price"))};
	beverages.add(beverage, function(err, beverage){
		res.end( JSON.stringify(beverage) );
		io.sockets.emit('beverageAdded', beverage);
	});
 })
 .del ("/beverages/:beverage", auth, function(req, res){
	"use strict";
	var beverage = {name: req.param("beverage")};
	beverages.del(beverage, function(err, beverage){
		res.end("{}");
		io.sockets.emit('beverageDeleted', beverage);
	});
 })
 .put ("/beverages/:beverage", auth, function(req, res){
	"use strict";
	var beverage = { name: req.param("beverage"), price: parseFloat(req.body.price) };
	beverages.update(beverage, function(err, beverage){
		res.end( JSON.stringify(beverage) );
		io.sockets.emit('beverageChanged', beverage);
	});
 })
;
