'use strict';

const express = require('express');
const mysqlConnection = require('../connection');
const router = express.Router();


/* GET employees listing. */
router.get('/', function (req, res) {
  let query = "Select * from employees";
  mysqlConnection.query(query, (err, rows) => {
    if (!err) {
      console.log(rows);
      return res.send(rows);
    } else {
      console.log(err);
    }
  });
});

//route for insert data
router.post('/save', (req, res) => {
  let data = {
    id: 9,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    hireDate: req.body.hireDate,
    role: req.body.role
  };
  let query = "INSERT INTO employees SET ?";
  mysqlConnection.query(query, data, (err, results) => {
    if (err) {
      console.log(err);
    }
    res.redirect('/');
  });
});

//route for update data
router.put('/update/:id', (req, res) => {
  var id = req.params.id;
  let query = `UPDATE employees 
               SET firstname='` + req.body.firstname + `', 
                   lastname='` + req.body.lastname + `' , 
                   hireDate='` + req.body.hireDate + `'
               WHERE id=` + id;
  console.log(query);
  mysqlConnection.query(query, (err, results) => {
    if (err) throw err;
    res.redirect('/');
  });
});

//route for delete data
router.delete('/delete/:id', (req,res) => {
  var id = req.params.id;
  let query = "DELETE FROM employees WHERE id=" + id + "";
  mysqlConnection.query(query, (err, results) => {
    if (err) throw err;
    res.redirect('/');
  });
});


router.get('/test', function (req, res) {
  return res.send("Node application Test API");
});


module.exports = router;
