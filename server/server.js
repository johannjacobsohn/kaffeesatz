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
	};

var db = require("./db.js").db;
db.users.ensureIndex({name: 1}, {unique: true});

io.set('transports', ['xhr-polling']);

server.listen(process.env.VMC_APP_PORT || 1234);

app
 .use(allowCrossDomain)                  // allow other domains via CORS header
// .use(express.logger({stream: logFile})) // log to access.log
 .use(express.compress())                // use compression
 .use(express.bodyParser())                // use compression

// static files
 .use("/app", express["static"](__dirname + '/../app'))
 .use("/admin", express["static"](__dirname + '/../admin'))

// REST-API:

// user
 .post("/users/:user/:beverage", users.addBeverage)
 .get ("/users",                 users.list)
 .get ("/user/:user",            users.get)
 .post("/users/:user",           users.add)
 .del ("/users/:user",           users.del)
 .put ("/users/:user",           users.update.bind(this, io))

// beverages
 .get ("/beverages",           beverages.list)
 .get ("/beverages/:beverage", beverages.get)
 .post("/beverages/:beverage", beverages.add)
 .del ("/beverages/:beverage", beverages.del)
 .put ("/beverages/:beverage", beverages.update)
;


// Socket-API:
io.sockets.on('connection', function (socket) {
});
