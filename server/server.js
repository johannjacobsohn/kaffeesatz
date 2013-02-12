var
	express = require('express'), 
//	users = require("./users.js").users,
	beverages = require("./beverages.js").beverages,
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
	// https://gist.github.com/2344435
	allowCrossDomain = function(req, res, next) {
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

var users = {
		addBeverage : function(req, res){
			var inc = { $inc: { inc:1 } };
			inc.$inc["beverages."+req.params.beverage] = 1;

			db.users.update({name:req.params.user}, inc, {multi:true}, function(err, user) {
				// the update is complete
				db.users.find({name: req.params.user },function(err, user) {
					if(err){
						console.error(err);
					}
					res.end(JSON.stringify(user[0]));
				});
			});
		},
		list : function(req, res){
			db.users.find(function(err, users) {
				if(err){ 
					console.error(err);
				}
				res.end(JSON.stringify(users));
			});
		},
		add : function(req, res, next){
			db.users.save({ name : req.param("name") }, function(err, savedUser){
				if(err){ 
					console.error(err);
//					return next(new Error('failed to add User'));
				}
				res.end(JSON.stringify({err:err, user: savedUser}));
			});
		},
		update : function(req, res){
			req.body.beverages = req.body.beverages || {};
			db.users.update({ name: req.params.user }, {$set:{beverages: req.body.beverages}}, function(err){
				db.users.find({name: req.params.user },function(err, user) {
					if(err){
						console.error(err);
					}
					res.end(JSON.stringify(user[0]));

					io.sockets.emit('userChanged', user[0]);

				});
			});
		},
		del : function(req, res){
			db.users.remove({name:req.params.user}, true);
			res.end(JSON.stringify({})); // backbone expect a result
		},
		get : function(req, res){
			console.log("implement me");
		}
	};

server.listen(process.env.VMC_APP_PORT || 1234);

app
 .use(allowCrossDomain)                  // allow other domains via CORS header
// .use(express.logger({stream: logFile})) // log to access.log
 .use(express.compress())                // use compression
 .use(express.bodyParser())                // use compression

// static files
 .use("/app", express.static(__dirname + '/../app'))
 .use("/admin", express.static(__dirname + '/../admin'))

// REST-API:

// user 
 .post("/users/:user/:beverage", users.addBeverage)
 .get ("/users",                 users.list)
 .get ("/user/:user",            users.get)
 .post("/users/:user",           users.add)
 .del ("/users/:user",           users.del)
 .put ("/users/:user",           function(){ users.update.apply(this, arguments); } )

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
