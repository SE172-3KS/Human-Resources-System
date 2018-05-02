import HttpService from '../src/services/http.service';

let httpService = new HttpService();

var assert = require('assert');
describe('Database Tests', function() {
    var server;
    beforeEach(function() {
        server = require('../server');
    });
    afterEach(function() {
        server.close();
    });

    it('test1', function test1(done) {
        request(server).get('/listEmployees').expect(200, done);
    });

});
