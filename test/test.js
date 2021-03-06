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
    it('retrieve payouts from server', function (done) {
      http.get('http://localhost:3000/api/listPayouts', {
        headers: {
          Authorization: 'Bearer ' + "seling.chenn@gmail.com"
        }
      }).then((data) => {
        assert.equal(data.status,200)
        done()
      }).catch(err => {
        done(err)
      })
    })
    it('retrieve employees from server', function (done) {
      http.get('http://localhost:3000/api/listEmployees', {
        headers: {
          Authorization: 'Bearer ' + "seling.chenn@gmail.com"
        }
      }).then((data) => {
        assert.equal(data.status,200)
        done()
      }).catch(err => {
        done(err)
      })
    })
    it('testing getEmployees', function (done) {
      http.get('http://localhost:3000/api/getEmployees', {
        headers: {
          Authorization: 'Bearer ' + "seling.chenn@gmail.com"
        }
      }).then((data) => {
        assert.equal(data.status,200)
        done()
      }).catch(err => {
        done(err)
      })
    })
  });
});
