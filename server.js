let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let app = express();
let PORT = process.env.PORT || 3000;

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

app.get('/api/listEmployees', (request, response) => {
  response.json({ message: "Listing employees" });
});

app.post('/api/getEmployee', (request, response) => {
  response.json({ message: "Getting employee with data" + JSON.stringify(request.body)});
});

app.post('/api/createEmployee', (request, response) => {
  response.json({ message: 'Creating employee with data' + JSON.stringify(request.body)})
});

app.post('/api/updateEmployee', (request, response) => {
  response.json({ message: 'Updating employee with data' + JSON.stringify(request.body)})
});

app.post('/api/deleteEmployee', (request, response) => {
  response.json({ message: 'Deleting employee with data' + JSON.stringify(request.body)})
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