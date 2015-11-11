var expect = require('chai').expect;

describe('Basic tests :: ', function() {


  it('sails does not crash', function() {
    return true;
  });

  it('should be loaded as installable hook', function(done) {
    expect(sails.hooks.sqlconnection).to.not.be.null;
    done();
  });

  it('should be able to retrieve a sql connection', function(done) {
    var atsql = sails.hooks.sqlconnection.getConnection('atsql');
    expect(atsql).to.not.be.null;
    done();
  });

  it('should throw an error if an unknown connection is requested', function(done) {
    expect(sails.hooks.sqlconnection.getConnection.bind('junk')).to.throw('Cannot read property \'driver\' of undefined');
    done();
  });
});
