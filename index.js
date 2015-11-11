'use strict';

var _ = require('lodash'),
    sql = require('mssql');
module.exports = function (sails) {

  return {
    defaults: {
      __configKey__: {
        connections: {
        }
      }
    },
    initialize: function(cb) {
      var self = this;
      _.forEach(sails.config[this.configKey].connections, function(n, key) {
        self[key] = new sql.Connection(n);
        self[key].connect()
          .then(function() {
            sails.log.debug(key + ' connection pool initialized');
          })
          .catch(function(err) {
            sails.log.error(err)
          });
      });
      return cb();
    },
    getConnection: function(name) {
      return this[name];
    }
  };
}
