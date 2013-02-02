var
	express = require('express'), 
	databaseUrl = "coffeedb",
	collections = ["beverages", "users"],
	db = require("mongojs").connect(databaseUrl, collections);

db.beverages.drop();
db.beverages.save([{name:"Kaffee"}, {name:"Tee"}, {name:"Cappuccino"}, {name:"Espresso"}]);

db.users.ensureIndex({name: 1}, {unique: true}); 

var
	addBeverageToUser = function(req, res){
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
	listUsers = function(req, res){
		db.users.find(function(err, users) {
			if(err){ 
				console.error(err);
			}
			res.end(JSON.stringify(users));
		});
	},
	listBeverages = function(req, res){
		db.beverages.find(function(err, beverages) {
			if(err){ 
				console.error(err);
			}
			res.end(JSON.stringify(beverages));
		});
	},
	addUser = function(req, res){
		var user = {
			name : req.params.user
		};
		db.users.save(user, function(err, savedUser){
			if(err){
				console.error(err);
			}
			res.end(JSON.stringify({err:err, user: savedUser}));
		});
	},
	deleteUser = function(req, res){
		db.users.remove({name:req.params.user}, true);
		res.end();
	},
	clearUser = function(req, res){
		var inc = { $unset: {beverages: 1} };
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

var app = express()
 .use(allowCrossDomain)                  // allow other domains via CORS header
// .use(express.logger({stream: logFile})) // log to access.log
 .use(express.compress())                // use compression
 .post("/:user/:beverage", addBeverageToUser)
 .get ("/", listUsers)
 .get ("/beverages", listBeverages)
 .post("/:user", addUser)
 .del ("/:user", deleteUser)
 .put ("/:user/clear", clearUser)
 .listen(1234);
