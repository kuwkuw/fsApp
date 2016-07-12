
var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

var counter = 0,
    database = null,
    commentsCollection = null,
    url = 'mongodb://127.0.0.1:27017/test';



module.exports = DbService;

MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    
    database = db;
    commentsCollection = database.collection('comments');
    console.log("DATABASE connected correctly to MongoDB server.");
});

function DbService() {
    console.warn('DATABASE Closing connection');
    database.close();
}

DbService.addComment = function(comment, callBack) {
   commentsCollection.insertOne(comment, callBack);
};

DbService.getComments = function(query, callBack){
    commentsCollection.find(query).toArray(callBack);
}

DbService.getComment = function(query, callBack){
    commentsCollection.findOne(query, null, callBack);
}


module.exports = DbService;