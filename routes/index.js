// var express = require('express');
// var router = express.Router();

// /* GET home page. */


// module.exports = router;

var express = require('express');
var router = express.Router();

var db = require('../queries');

router.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/puppies', db.getAllPuppies);
router.get('/api/puppies/:id', db.getSinglePuppy);
router.post('/api/puppies', db.createPuppy);
router.put('/api/puppies/:id', db.updatePuppy);
router.delete('/api/puppies/:id', db.removePuppy);
router.get('/api/puppies/:id/bones', db.getBones);
router.get('/api/payments', db.getAllPayments);
router.get('/api/user/:id/payments', db.getUserPayments);
router.post('/api/user/:id/payments', db.createPayment);


module.exports = router;