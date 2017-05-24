var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
// var connectionString = 'postgres://localhost:5432/puppies';
// var connectionString = 'postgres://127.0.0.1:5432/puppies';
var connectionString = 'postgres://rzzolrjvcpmrux:d2ac4c8257791378a91460c6034552754d969f4357f55d44671e8d6b5e1c2f77@ec2-54-163-246-154.compute-1.amazonaws.com:5432/dftsa131onc0gu';

var db = pgp(connectionString);


function getAllPayments(req, res, next) {
  db.query('select * from payments')
    .then((data) => {
      res.status(200)
        .json({
          status: "success",
          data: data,
          message: 'Retreived ALL puppies'
        });
    })
      .catch((err) => {
        return next(err);
      });
}

function getUserPayments(req, res, next) {
    var userID = parseInt(req.params.id);
    db.query('select * from payments where user_id=$1', userID)
      .then((data) => {
        res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE puppy'
        });
      })
      .catch( (err) => {
        return next(err);
      });
}

function updatePayment(req, res, next) {
  // console.log(req.params.id);
  // console.log(req.body);
  db.query('update payments set user_id=$1, firstname=$2, lastname=$3, card=$4, card_number=$5, expires_month=$6, expires_year=$7, csc=$8 where id=$9',
    [parseInt(req.body.user_id), req.body.firstname, req.body.lastname, req.body.card,
    req.body.card_number, parseInt(req.body.expires_month), parseInt(req.body.expires_year), parseInt(req.body.csc), parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated payment'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createPayment(req, res, next) {
  // console.log(req.params.id);
  // console.log(req.body);
  req.body.user_id = parseInt(req.params.id);
  req.body.expires_month = parseInt(req.body.expires_month);
  req.body.expires_year = parseInt(req.body.expires_year);
  req.body.csc = parseInt(req.body.csc);
  console.log("after");
  // console.log(req.params.id);
  console.log(req.body);

  db.query('insert into payments(user_id, firstname, lastname, card, card_number, expires_month, expires_year, csc)' +
    'values(${user_id}, ${firstname}, ${lastname}, ${card}, ${card_number}, ${expires_month}, ${expires_year}, ${csc})', req.body)
      .then(() => {
        res.status(200)
          .json({
            status: 'success',
            message: 'Inserted one payment'
          });
      })
      .catch(err => {
        return next(err);
      });
}

function removePayment(req, res, next) {
  var paymentID = parseInt(req.params.id);
  db.query('delete from payments where id=$1', paymentID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} payment`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}

module.exports = {
  getAllPayments: getAllPayments,
  getUserPayments: getUserPayments,
  createPayment: createPayment,
  updatePayment: updatePayment,
  removePayment: removePayment
};
