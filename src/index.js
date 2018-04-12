import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';

import Home from './components/pages/home.js';
import Layout from './components/pages/layout.js';
import Employees from './components/pages/employees.js';
import Login from './components/auth/login';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Home}/>
      <Route path="/login" component={Login}/>
      <Route path="/employees" component={Employees}/>
    </Route>
  </Router>,
  document.getElementById('root')
);
