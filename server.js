let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let app = express();
let PORT = process.env.PORT || 3000;
let mysql = require('mysql');
let paypal = require('paypal-rest-sdk');
let axios = require('axios');

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
  isUserAuthorized(request.headers.authorization).then(auth => {
    if (auth.status === 1) {
      connection.query('select * from employees limit 30;', (err, rows, fields)=> {
        if (err) throw err
        response.json({ message: rows });
      });
    } else {
      response.json({status: 0, msg: 'User is not authorized to perform this action'});
    }
  }).catch(err => {
    response.json(err)
  });
});

app.post('/api/getEmployee', (request, response) => {
  isUserAuthorized(request.headers.authorization).then(auth => {
    if (auth.status === 1) {
      let id = request.body.id;
      connection.query('select * from employees where emp_no = ' + id + ';', (err, rows, fields)=> {
        if (err) throw err
        var generalInfo = rows[0];
        connection.query('select * from employee_info where emp_no = '+id + ';', (err, rows, fields) =>{
          if(err) throw err
          var moreInfo = rows[rows.length-1];
          var info = Object.assign({}, generalInfo, moreInfo);
          response.json({message: info});
        });
      });
    } else {
      response.json({status: 0, msg: 'User is not authorized to perform this action'});
    }
  }).catch(err => {
    response.json(err)
  });
});

app.post('/api/createEmployee', (request, response) => {
  isUserAuthorized(request.headers.authorization).then(auth => {
    if (auth.status === 1) {
      let emp = request.body.employee;

      var query = "Insert into employees values ("
        +emp.emp_no+", '"
        +emp.dob+"','"
        +emp.first_name+"','"
        +emp.last_name+"','"
        +emp.gender+"','"
        +emp.hire_date+"');"
      connection.query(query);
      query = "Insert into dept_emp values ("
        +emp.emp_no+", '"
        +emp.dept_no+"', '"
        +emp.hire_date+"','9999-01-01');"
      connection.query(query);
      query = "Insert into salaries values ("
        +emp.emp_no+", "
        +emp.salary+", '"
        +emp.hire_date+"','9999-01-01');"
      connection.query(query);
      query = "Insert into titles values ("
        +emp.emp_no+", '"
        +emp.title+"', '"
        +emp.hire_date+"','9999-01-01');"
      connection.query(query);
    } else {
      response.json({status: 0, msg: 'User is not authorized to perform this action'});
    }
  }).catch(err => {
    response.json(err)
  });
});

app.post('/api/updateEmployee', (request, response) => {
  isUserAuthorized(request.headers.authorization).then(auth => {
    if (auth.status === 1) {
      let emp = request.body.employee;

      let query = "Update employees set "
        +"birth_date = '"+emp.birth_date+"',"
        +"first_name = '"+emp.first_name+"',"
        +"last_name = '"+emp.last_name+"',"
        +"gender = '"+emp.gender+"',"
        +"hire_date = '"+emp.hire_date+"' "
        +"where emp_no = "+emp.emp_no;
      connection.query(query);
      query = "Update dept_emp set "
        +"dept_no = '"+emp.dept_no+"' "
        +"where emp_no = "+emp.emp_no;
      connection.query(query);
      query = "Update salaries set "
        +"salary = "+emp.salary
        +" where emp_no = "+emp.emp_no;
      connection.query(query);
      query = "Update titles set "
        +"title = '"+emp.title+"' "
        +"where emp_no = "+emp.emp_no;
      connection.query(query);
    } else {
      response.json({status: 0, msg: 'User is not authorized to perform this action'});
    }
  }).catch(err => {
    response.json(err)
  });
});

app.post('/api/deleteEmployee', (request, response) => {
  isUserAuthorized(request.headers.authorization).then(auth => {
    if (auth.status === 1) {
      let emp_no = request.body.emp_no;

      if(emp_no){
        let query = "delete from employees where emp_no = " + emp_no + ";";
        connection.query(query);
        query = "delete from salaries where emp_no = " + emp_no + ";";
        connection.query(query);
        query = "delete from titles where emp_no = " + emp_no + ";";
        connection.query(query);
        query = "delete from dept_emp where emp_no = " + emp_no + ";";
        connection.query(query);
        response.json({result: "Done deleting"});
      }else
        response.json({result: "Can't delete for some reason"});
    } else {
      response.json({status: 0, msg: 'User is not authorized to perform this action'});
    }
  }).catch(err => {
    response.json(err)
  });
});

//paypal payout
app.post('/api/makePayout', (request, response)=> {
  isUserAuthorized(request.headers.authorization).then(auth => {
    if (auth.status === 1) {
      let create_payout = request.body.create_payout;

      paypal.payout.create(create_payout, (error, payout) => {
        if (error) {
          response.json({message: "Payout error"});
        } else {
          let payout_batch_id = payout.batch_header.payout_batch_id;
          let date = new Date();
          let day = date.getDate();
          let year = date.getFullYear();
          let month = date.getMonth()+1;
          let dateInput = year+"-"+month+"-"+day;

          let query = "insert into payouts values ('"+payout_batch_id+"', '"+dateInput+"');";
          connection.query(query, (err, rows, fields)=> {
            if (err) throw err
          });

          response.json({message: payout_batch_id});
        }
      });
    } else {
      response.json({status: 0, msg: 'User is not authorized to perform this action'});
    }
  }).catch(err => {
    response.json(err)
  });
});

app.post('/api/getPayout', (request, response) => {
  isUserAuthorized(request.headers.authorization).then(auth => {
    if (auth.status === 1) {
      let payoutId = request.body.id;
      paypal.payout.get(payoutId, (error, payout) => {
        if(error){
          response.json({message: "Error"});
        }else{
          response.json({message: "Success", payout: payout});
        }
      });
    } else {
      response.json({status: 0, msg: 'User is not authorized to perform this action'});
    }
  }).catch(err => {
    response.json(err)
  });
});

app.get('/api/listPayouts', (request, response) => {
  isUserAuthorized(request.headers.authorization).then(auth => {
    if (auth.status === 1) {
      connection.query("Select * from payouts", (err, rows, fields) => {
        response.json({payouts: rows});
      });
    } else {
      response.json({status: 0, msg: 'User is not authorized to perform this action'});
    }
  }).catch(err => {
    response.json(err)
  });
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

function isUserAuthorized (token) {
  let uid = token.replace('Bearer ', '');

  return new Promise((resolve, reject) => {
    axios({
      url: 'https://dev-733769.oktapreview.com/api/v1/users/' + uid,
      headers: {
        Authorization: 'SSWS 00q1JOGG8DaPbDnWI-POcRskpI4lrRJ9lNUot4LIX1'
      }
    }).then(response => {
      resolve({status: response.data.status === 'ACTIVE' ? 1 : 0})
    }).catch(err => {
      reject({status: -1, msg: err.data.errorSummary})
    });
  });
}