var express = require('express');
var fsService = require('../server/fsService');
var router = express.Router();

/* GET*/
router.get('/:path', function(req, res, next) {
    var fsS =  new  fsService();
    var arr = fsS.getDirStructure(req.params.path);
    if(arr.length === 0){
        res.status(404).end();
    }
    res.send(arr);
});

router.post('/:comment', function(req, res, next){

});



module.exports = router;
