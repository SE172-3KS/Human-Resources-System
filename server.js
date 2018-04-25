let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let app = express();
let PORT = process.env.PORT || 3000;
let mysql = require('mysql');

if(process.env.NODE_ENV !== 'production') {
  let webpackDevMiddleware = require('webpack-dev-middleware');
  let webpackHotMiddleware = require('webpack-hot-middleware');
  let webpack = require('webpack');
  let config = require('./webpack.config');
  let compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
}

app.use(express.static(path.join(__dirname, 'build')));

//mysql connection
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : '3ks',
  password : '123456',
  database : 'employees'
});
connection.connect();

app.get('/api/listEmployees', (request, response) => {
  connection.query('select * from employees limit 30;', (err, rows, fields)=> {
    if (err) throw err
    response.json({ message: rows });
  });
});

app.post('/api/getEmployee', (request, response) => {
  let id = request.body.id;
  connection.query('select * from employees where emp_no = ' + id + ';', (err, rows, fields)=> {
    if (err) throw err
    response.json({ message: rows });
  });
});

app.post('/api/createEmployee', (request, response) => {
  let firstName = request.body.firstName;
  let lastName = request.body.lastName;
  let emp_no = request.body.emp_no;

  var query = "insert into employees " +
              "values (" + emp_no + ",'1994-02-10', '" + firstName +"', '"+lastName +
              "', 'M', '2018-02-10');";

  connection.query(query, (err, rows, fields)=> {
    if (err) throw err
    connection.query("Select * from employees where emp_no = " + emp_no + ";", (err, rows, fields)=> {
      if (err) throw err
      response.json({ message: rows});
    });
  });
});

app.post('/api/updateEmployee', (request, response) => {
  let emp_no = request.body.emp_no;
  let first_name = request.body.first_name;

  var query = "update employees set first_name = '"+ first_name + "' where emp_no = " + emp_no +";";

  connection.query(query, (err, rows, fields)=> {
    if (err) throw err
    response.json({ result: 'Updating employee with emp_no' + emp_no + "Refresh to see change."});
  });
});

app.post('/api/deleteEmployee', (request, response) => {
  let emp_no = request.body.emp_no;

  if(emp_no){
    var query = "delete from employees where emp_no = " + emp_no + ";";

    connection.query(query, (err, rows, fields)=> {
      if (err) throw err
      response.json({result: "Employee with id "+emp_no + " was deleted. Refresh to see it gone" });
    });

  }else
    response.json({result: "Can't delete for some reason"});
});


app.get('*', function(request, response){
	response.sendFile(__dirname + '/build/index.html');

});



app.listen(PORT, function(error){
	if(error){
		console.log(error);
	}else{
		console.log("==> Listening on port %s. Visit http://localhost:%s in your browser.", PORT, PORT);
	}
});
