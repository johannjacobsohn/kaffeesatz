var db = require("./db.js").db;

db.beverages.ensureIndex({name: 1}, {unique: true});

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
	del : function(b, res){
		"use strict";
		db.beverages.remove({name: b.name}, true, res);
	}
};
