var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var sess = req.session;
  console.log(sess.email);
  res.render(
      'index',
      {
        title: 'File system tree',
        email: sess.email
      }
  );
});

module.exports = router;
