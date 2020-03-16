'use strict';

const express = require('express');
var cors = require('cors')
const mysqlConnection = require('../connection');
const router = express.Router();

router.options('*', cors()) // include before other routes


/* GET employees listing. */
router.get('/getEmployee', function (req, res) {
  let query = "Select * from employee";
  mysqlConnection.query(query, (err, rows) => {
    if (!err) {
      console.log(rows);
      return res.send(rows);
    } else {
      console.log(err);
    }
  });
});
router.get('/getEmployeebyId/:id', function (req, res) {
  var id = req.params.id;
  let query = "Select * from employee WHERE id = " + id;
  mysqlConnection.query(query, (err, rows) => {
    if (!err) {
      console.log(rows);
      return res.send(rows[0]);
    } else {
      console.log(err);
    }
  });
});

//route for insert data
router.post('/saveEmployee', (req, res) => {
  let data = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    hiredate: req.body.hiredate,
    jobrole: req.body.jobrole
  };
  let query = "INSERT INTO employee SET ?";
  mysqlConnection.query(query, data, (err, results) => {
    if (err) throw err;
    console.log("1 record inserted");
  });
});

//route for update data
router.put('/updateEmployee/:id', (req, res) => {
  var id = req.params.id;
  let query = `UPDATE employee 
               SET firstname='` + req.body.firstname + `', 
                   lastname='` + req.body.lastname + `' , 
                   hireDate='` + req.body.hiredate + `',
                   jobrole='` + req.body.jobrole + `'
               WHERE id=` + id;
  mysqlConnection.query(query, (err, results) => {
    if (err) throw err;
  });
});

//route for delete data
router.delete('/deleteEmployee/:id', (req, res) => {
  var id = req.params.id;
  console.log(id);
  let query = "DELETE FROM employee WHERE id=" + id + "";
  mysqlConnection.query(query, (err, results) => {
    if (err) throw err;
  });
});


router.get('/test', function (req, res) {
  return res.send("Node application Test API");
});


module.exports = router;
