/*
 * MongoDB configuration
 * 
 */
 
// Default configuration
var mongo = {
	"hostname" : "127.0.0.1",
	"port"     : 27017,
	"username" : "",
	"password" : "",
	"name"     : "coffeedb",
	"db"       : "coffeedb"
};

// rewrite credentials for appfog
if(process.env.VCAP_SERVICES){
	var env = JSON.parse(process.env.VCAP_SERVICES);
	mongo = env['mongodb-1.8'][0].credentials;
} else if(process.env.KAFFEESATZTESTDB){
	// local testing - set db to coffeedb_test to be dropped later
	mongo.db = process.env.KAFFEESATZTESTDB;
}

var mongourl;
if( mongo.username && mongo.password ){
	mongourl = "mongodb://" + mongo.username + ":" + mongo.password + "@" + mongo.hostname + ":" + mongo.port + "/" + mongo.db;
} else {
	mongourl = "mongodb://" + mongo.hostname + ":"                                               + mongo.port + "/" + mongo.db;
}

var collections = ["beverages", "users"];
var db = require("mongojs").connect(mongourl, collections);

exports.db = db;
