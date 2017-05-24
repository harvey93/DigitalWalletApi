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

router.get('/api/payments', db.getAllPayments);
router.get('/api/users/:id/payments', db.getUserPayments);
router.post('/api/users/:id/payments', db.createPayment);
router.put('/api/payments/:id', db.updatePayment);
router.delete('/api/payments/:id', db.removePayment);


module.exports = router;
