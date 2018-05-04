let axios = require('axios');
let http = axios.create();
let mysql = require('mysql');

var assert = require('assert');

describe('Database Tests', function () {
  var connection = mysql.createConnection({
    host: 'localhost',
    user: '3ks',
    password: '123456',
    database: 'employees'
  });
  connection.connect();

  describe('Test schemas', function () {
    it('retrieve employees from database', function () {
      connection.query('select * from employees limit 30;', (err, rows, fields) => {
        assert.equal(err, null);
      });
    });
    it('retrieve payout from database', function () {
      connection.query("Select * from payouts", (err, rows, fields) => {
        assert.equal(err, null);
      });
    });
  });
});
