'use strict';

var sql = require('mssql');
module.exports = function (sails) {

  return {
    defaults: {
      __configKey__: {
        connections: {
        }
      }
    },
    initialize: function(cb) {
      return cb();
    },
    getConnection: function(name) {
      if (this[name] !== undefined) {
        return this[name];
      }
      else {
        this[name] = new sql.Connection(sails.config[this.configKey].connections[name]);
        this[name].connect()
          .then(function() {
            return this[name];
          })
          .catch(function(err) {
            sails.log.error(err)
          });
      }
    }
  };
}
