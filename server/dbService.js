
var mongoClient = require('mongodb').MongoClient,
    assert = require('assert');

var counter = 0,
    database = null,
    comentsCollection = null,
    url = 'mongodb://127.0.0.1:27017/test';






function DbService(){
    this._url = 'mongodb://127.0.0.1:27017/test';
    this.comentsCollection;

    this._init()
}

DbService.prototype.addComment = function(){

};

DbService.prototype.findComment = function(){

};

DbService.prototype._init = function(){
    mongoClient.connect(url, function(err, db) {

    //database = db;
    this.comentsCollection = db.collection('coments');

    console.log("DATABASE connected correctly to MongoDB server.");
});
}




module.exports = DbService;