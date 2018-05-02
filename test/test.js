import HttpService from '../src/services/http.service';
let httpService = new HttpService();
let mysql = require('mysql');


var assert = require('assert');



describe('Database Tests', function() {
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : '3ks',
		password : '123456',
		database : 'employees'
	});
	connection.connect();

	describe('Test schemas', function() {
		it('test1', function() {
	        connection.query('select * from employees limit 30;', (err, rows, fields)=> {
				assert.equal(err, null);
	        });
		});
        it('test2', function() {
            connection.query("Select * from payouts", (err, rows, fields) => {
                response.json({payouts: rows});
            });
        });
	});
});
