let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');

let fs = require('fs');
let https = require('https');

let app = express();
let PORT = process.env.PORT || 3000;
let mysql = require('mysql');
let paypal = require('paypal-rest-sdk');

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

//paypal
paypal.configure({
  mode: 'sandbox', // Sandbox or live
  client_id: 'Ad16r3v7NeiMH04zON99RzZE5LAYeigawfZ_1D6yQZE09NfdcwM9fJ6qY4AiSbRb-N1P77TazQiCDwYL',
  client_secret: 'EOUz8SLT3tE2tT8RGLTYewBT_h_XWGk9WOMWPfCezFO_IBeLiqBzDQbwbBDl6NkGihKeidtDXOnpbnHR'
});

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

//paypal payout
app.post('/api/makePayout', (request, response)=> {
  var create_payout = request.body.create_payout;
  
  paypal.payout.create(create_payout, (error, payout) => {
    if (error) {
        console.log(error.response);
        response.json({message: "Payout error"});
    } else {
        var payout_batch_id = payout.batch_header.payout_batch_id;
        var date = new Date();
        var day = date.getDate();
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        var dateInput = year+"-"+month+"-"+day;

        let query = "insert into payouts values ('"+payout_batch_id+"', '"+dateInput+"');"; 
        console.log(query);
        connection.query(query, (err, rows, fields)=> {
          if (err) throw err
        });

        response.json({message: "Payout batch id " + payout_batch_id});
    }
  });
});

app.post('/api/getPayout', (request, response) => {
  var payoutId = request.body.id;
  paypal.payout.get(payoutId, (error, payout) => {
    if(error){
      console.log(error);
      response.json({message: "Error"});
    }else{
      response.json({message: "Success", payout: payout});
    }
  });
});

app.get('*', function(request, response){
  response.sendFile(__dirname + '/build/index.html');
});

let server = https.createServer({
  key: fs.readFileSync('keys/key.pem'),
  cert: fs.readFileSync('keys/cert.pem'),
  passphrase: '123456'
}, app);
server.listen(PORT);
