var express = require('express');
var FsService = require('../server/fsService');
var dbService = require('../server/dbService')
var router = express.Router();


var fsS =  new  FsService();


/* GET*/
router.get('/:path', function(req, res, next) {
    var dirTree = fsS.getDirStructure(req.params.path);
    console.log(req.params.path);
    if(!dirTree){
        res.status(404).end();
    }
    res.send(dirTree);
});

/* GET coments*/
router.get('/comments/:query', function(req, res, next){
    var path = req.params['query'];
    var query = {path: path};
    dbService.getComments(query, function(err, data){
        res.send(data);
    });
});

/*POST new coment*/
router.post('/comments', function(req, res, next){
    var sass = req.session;
    var comment = req.body;
    dbService.addComment(comment, function (err, result) {
        res.send(comment);
    });
    
    //res.end();
});


module.exports = router;
