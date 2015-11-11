'use strict';
var sails = require('sails'),
    fs = require('fs');

before(function(done) {
  var config = require(__dirname + '/.config.json');
  sails.lift({
    hooks: {
      "sqlconnection": require('../'),
      "grunt": false
    },
    log: {level: "error"},
    sqlconnection: config
  }, function(err, _sails) {
    if (err) return done(err);
    done(null, _sails);
  });
});

after(function(done) {
  sails.lower(done);
});
