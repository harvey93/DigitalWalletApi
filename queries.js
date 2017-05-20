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

// add query functions

// function getAllPuppies(req, res, next) {
//   db.any('select * from pups')
//     .then(function (data) {
//       res.status(200)
//         .json({
//           status: 'success',
//           data: data,
//           message: 'Retrieved ALL puppies'
//         });
//     })
//     .catch(function (err) {
//       return next(err);
//     });
// }

function getAllPuppies(req, res, next) {
  db.query('SELECT * FROM pups')
    .then((data) => {
      res.status(200)
        .json({
          status: "success",
          data: data,
          message: 'Retreived ALL puppies'
        });
    })
    .catch(err => {
      return next(err);
    });
}

function getBones(req, res, next) {
  var pupID = parseInt(req.params.id);
  db.query('select * from bones where bones.dogid = $1', pupID)
    .then( (data) => {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE puppy'
        });
    })
      .catch((err) => {
        return next(err);
      });
}

function getSinglePuppy(req, res, next) {
  // console.log('in');
  var pupID = parseInt(req.params.id);
  db.one('select * from pups where id = $1', pupID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE puppy'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

// function createPuppy(req, res, next) {
//     // console.log(req.params);
//     // console.log('body: ')
//     // console.log(req.body);
//   req.body.age = parseInt(req.body.age);
//   // console.log(req.body.age);
//   db.none('insert into pups(name, breed, age, sex)' +
//       'values(${name}, ${breed}, ${age}, ${sex})',
//     req.body)
//     .then(function () {
//       res.status(200)
//         .json({
//           status: 'success',
//           message: 'Inserted one puppy'
//         });
//     })
//     .catch(function (err) {
//       return next(err);
//     });
// }

function createPuppy(req, res, next) {
  req.body.age = parseInt(req.body.age);
  db.query('insert into pups(name, breed, age, sex)' + 
    'values(${name}, ${breed}, ${age}, ${sex})', req.body)
      .then(() => {
        res.status(200)
          .json({
            status: 'success',
            message: 'Inserted one puppy'
          });
      })
      .catch(err => {
        return next(err);
      });
}

function updatePuppy(req, res, next) {
  // console.log(req.body);
  db.none('update pups set name=$1, breed=$2, age=$3, sex=$4 where id=$5',
    [req.body.name, req.body.breed, parseInt(req.body.age),
      req.body.sex, parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated puppy'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removePuppy(req, res, next) {
  var pupID = parseInt(req.params.id);
  db.result('delete from pups where id = $1', pupID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} puppy`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}

module.exports = {
  getAllPuppies: getAllPuppies,
  getSinglePuppy: getSinglePuppy,
  createPuppy: createPuppy,
  updatePuppy: updatePuppy,
  removePuppy: removePuppy,
  getBones: getBones
};
