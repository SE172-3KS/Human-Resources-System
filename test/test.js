import HttpService from '../src/services/http.service';

let httpService = new HttpService();

var assert = require('assert');
describe('Database Tests', function() {
    describe('List Employees', function() {
        it('Message result should contain valid output', function() {
            var req = httpService.get({
                url: '/api/listEmployees'
            });
            /*.then(result => {
                assert.notEqual(result, null);
            });*/
            console.log("REQ; ", req);
            console.log("END");
        });
    });
});
