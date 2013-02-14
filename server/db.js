// appfog
if(process.env.VCAP_SERVICES){
	var env = JSON.parse(process.env.VCAP_SERVICES);
	var mongo = env['mongodb-1.8'][0].credentials;
} else if(process.env.TRAVIS){
	var mongo = {
		"hostname":"127.0.0.1",
		"port":27017,
		"username":"",
		"password":"",
		"name":"coffeedb",
		"db":"db"
	};
} else {
	var mongo = {
		"hostname":"localhost",
		"port":27017,
		"username":"",
		"password":"",
		"name":"coffeedb",
		"db":"db"
	};
}
var generate_mongo_url = function(obj){
	obj.hostname = (obj.hostname || 'localhost');
	obj.port = (obj.port || 27017);
	obj.db = (obj.db || 'test');
	if(obj.username && obj.password){
		return "mongodb://" + obj.username + ":" + obj.password + "@" + obj.hostname + ":" + obj.port + "/" + obj.db;
	}
	else{
		return "mongodb://" + obj.hostname + ":" + obj.port + "/" + obj.db;
	}
};
var mongourl = generate_mongo_url(mongo);

var collections = ["beverages", "users"];
var db = require("mongojs").connect(mongourl, collections);

exports.db = db;
