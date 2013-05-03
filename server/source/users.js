var db = require("./db.js").db;

db.users.ensureIndex({name: 1}, {unique: true},  function(err, indexName) {
	"use strict";
	if(err){
		console.log(err);
	}
});

exports.users = {
	addBeverage : function(user, beverage, res){
		"use strict";
		var inc = { $inc: { inc:1 } };
		inc.$inc["beverages."+beverage] = 1;

		db.users.update({name:user}, inc, {multi:true}, function(err, success) {
			// the update is complete
			db.users.find({name: user}, function(err, users) {
				if(err){
					console.error(err);
				}
				res(err, users[0]);
			});
		});
	},
	list : function(res){
		"use strict";
		db.users.find(function(err, users) {
			if(err){
				console.error(err);
			}
			res(null, users);
		});
	},
	add : function(user, res){
		"use strict";
		db.users.save({ name : user.name }, function(err, savedUser){
			if(err){
				console.error(err);
			}
			res(err, savedUser);
		});
	},
	update: function(user, res){
		"use strict";
		db.users.update({ name: user.name }, {$set:{beverages: user.beverages}}, function(err){
			db.users.find({name: user.name },function(err, user) {
				if(err){
					console.error(err);
				}
				res(null, user[0]);
			});
		});
	},
	del: function(u, res){
		"use strict";
		this.get(u.name, function(err, user){
			if(err){
				console.error(err);
			} else if(user) {
				db.users.remove({name:user.name}, true, function(err){
					if(err){
						console.error(err);
					}
					res(err, user);
				});
			} else {
				res(err, u);
			}
		});
	},
	get: function(name, res){
		"use strict";
		db.users.find({name: name },function(err, user) {
			if(err){
				console.error(err);
			}
			res(null, user[0]);
		});
	}
};
