var db = require("./db.js").db;
db.beverages.ensureIndex({name: 1}, {unique: true, dropDups: true}, function(err, indexName) {
	"use strict";
	if(err){
		console.log(err);
	}
});

exports.beverages = {
	list: function(res){
		"use strict";
		db.beverages.find(function(err, beverages) {
			if(err){
				console.error(err);
			}
			res(err, beverages);
		});
	},
	get: function(name, res){
		"use strict";
		db.beverages.find({name: name}, function(err, beverages) {
			if(err){
				console.error(err);
			}
			res(err, beverages[0]);
		});
	},
	add: function(b, res){
		"use strict";
		db.beverages.save({name: b.name, price: b.price}, function(err, beverage){
			if(err){
				console.error(err);
			}
			res(err, beverage);
		});
	},
	update : function(b, res){
		"use strict";
		db.beverages.update({name: b.name}, {$set:{price: b.price}}, function(err){
			db.beverages.find({name: b.name},function(err, beverages) {
				if(err){
					console.error(err);
				}
				res(err, beverages[0]);
			});
		});
	},
	del: function(u, res){
		"use strict";
		this.get(u.name, function(err, user){
			if(err){
				console.error(err);
			} else if(user) {
				db.beverages.remove({name:user.name}, true, function(err){
					if(err){
						console.error(err);
					}
					res(err, user);
				});
			} else {
				res(err, u);
			}
		});
	}
};
