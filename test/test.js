var assert = require('assert');
var Chart = require('../models/chart.js');

describe('Array', function() {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal(-1, [1,2,3].indexOf(5));
    });
  });
});


describe('Chart', function() {
  describe('#save()', function() {
    it('should save without error', function(done) {
      var chart = new Chart('somehash');
      chart.save(done);
    });
  });
});
