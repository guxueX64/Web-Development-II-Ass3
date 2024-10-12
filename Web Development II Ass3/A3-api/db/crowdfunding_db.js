//Introduce mysql2 module for creating and operating MySQL database connections
const mysql = require('mysql2');

//Create a database connection pool to manage and reuse database connections
const pool = mysql.createPool({   //DB Connection Pool
 host: 'localhost',
 port: '3306',
 user: 'root',
 password: '123456',
 database: 'crowdfunding_db',
});

//Check if the connection pool was successfully created, and if so, print the log of successful connection
if (pool) {
 console.log('MySQL server started and connected successfully  ...');
}

//Link Database
function query(sql, callback) {
  //Print log information of SQL statements
  console.log('   ');
  console.info('==========', '[  ', sql, '  ]');
  console.log('   ');

  //Retrieve a connection from the connection pool
  pool.getConnection(function (err, connection) {
    //Execute SQL queries using the obtained connection
    connection.query(sql, function (err, rows) {
      //error handling
      if(err) {
        console.log(err);
      }
      //Call callback functions to pass query results or error messages
      callback(err, rows);
      //Release the connection for other requests to use
      connection.release();
    });
  });
}

//Export the query function
module.exports = {
  query
};