var db = require("./db.js").db;

db.users.ensureIndex({name: 1}, {unique: true}); 

exports.users = {
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
			})
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
	}
