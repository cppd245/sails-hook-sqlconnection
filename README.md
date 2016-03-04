# sails-hook-sqlconnection

A [Sails JS](http://sailsjs.org) hook to create global [mssql](http://github.com/patriksimek/node-mssql) connection pool objects.

*Note: requires Sails >= 0.11*

This hook will initialize your mssql connection pool objects when Sails lifts and can be used to retrieve the connection for use throughout your Sails project.

### Installation

`npm install sails-hook-sqlconnection`

### Usage

`sails.hooks.sqlconnection.getConnection(connection)`

Parameter    | Type        | Details
-------------|-------------|--------------------------
connection   | ((string))  | Name of your mssql connection

### Configuration

By default, configuration lives in `sails.config.sqlconnection`.  The configuration key (`sqlconnection`) can by changed by setting `sails.config.hooks['sails-hook-sqlconnection'].configKey`.

Parameter    | Type        | Details
-------------|-------------|--------------------------
connections  | ((object))  | Object containing mssql connection config objects
connection   | ((object))  | mssql connection config object
server       | ((string))  | mssql host name
user         | ((string))  | mssql username
password     | ((string))  | mssql password
database     | ((string))  | mssql database

*Additional config options are available, see the [mssql documentation](http://github.com/patriksimek/node-mssql/#cfg) for more details*

```javascript
// [your-sails-app]/config/sqlconnection.js
'use strict';

module.exports.sqlconnection = {
  connections: {
    mssqlserver: {
      server: "localhost",
      user: "user",
      password: "password",
      database: "example"
    }
  }
}

```

### Example

Use mssql as you noramally would once a connection pool has been initialized:

```javascript
'use strict';

var sql = require('mssql');

var request = new sql.Request(sails.hooks.sqlconnection.getConnection('mssqlserver'));

request.query('select * from sometable').then(function(recordset) {
  console.dir(recordset);
}).catch(function(err) {
  // ... query error handling
});
```
