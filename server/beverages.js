var db = require("./db.js").db;

db.beverages.ensureIndex({name: 1}, {unique: true});

exports.beverages = {
	list : function(req, res){
		"use strict";
		db.beverages.find(function(err, beverages) {
			if(err){
				console.error(err);
			}
			res.end(JSON.stringify(beverages));
		});
	},
	get : function(req, res){
		"use strict";
		console.log("implement me");
	},
	add : function(req, res){
		"use strict";
		db.beverages.save({ name : req.param("name"), price: req.param("price") }, function(err, beverages){
			if(err){
				console.error(err);
//					return next(new Error('failed to add beverage'));
			}
			res.end(JSON.stringify({err:err, beverages: beverages}));
		});
	},
	update : function(req, res){
		"use strict";
		req.body.price = req.body.price || 0;
		db.beverages.update({ name: req.params.beverage }, {$set:{price: req.body.price}}, function(err){
			db.beverages.find({name: req.params.beverage },function(err, beverages) {
				if(err){
					console.error(err);
				}
				res.end(JSON.stringify(beverages[0]));
			});
		});
	},
	del : function(req, res){
		"use strict";
		db.beverages.remove({name:req.params.beverage}, true);
		res.end(JSON.stringify({})); // backbone expect a result
	}
};
