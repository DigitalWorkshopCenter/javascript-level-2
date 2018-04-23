//include my sql node library
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
  port: '3306'
});

connection.connect(function (error) {
  if (error) throw error;
  console.log('Connected!');

  //creating a database
  connection.query("CREATE DATABASE test", function (error, result) {

  });

  //create a table
  var sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
  connection.query(sql, function (error, result) {

  });


  //insert data into the table
  var insert = "INSERT INTO customers (name,address) VALUES ?";
  var values = [["Christine", "Fort Collins"]
  ["Dave", "Texas"]
  ];

  connection.query(insert, [values], function (error, result) {

  });


  //select data from the table
  var select = "SELECT * FROM customers";
  connection.query(select, function (error, result, fields) {
    console.log(result);
  });

});

