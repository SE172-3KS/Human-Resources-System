import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import TableauReport from 'tableau-react';
import tableau from "tableau-api";

import Home from './components/pages/home.js';
import Layout from './components/pages/layout.js';
import Employees from './components/pages/employeesTest.js';
import Login from './components/auth/login';
import Gender from './components/pages/gender.js';
import Charts from './components/pages/charts.js';
import Salary from './components/pages/salary.js';
import Payment from './components/pages/payment.js';
import Payout from './components/pages/payouts.js';


ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Home}/>
      <Route path="/login" component={Login}/>
      <Route path="/employees" component={Employees}/>
      <Route path="/charts" component={Charts}/>
      <Route path="/gender" component={Gender}/>
      <Route path="/salary" component={Salary}/>
      <Route path="/payment" component={Payment}/>
      <Route path="/payout" component={Payout}/>
    </Route>
  </Router>,
  document.getElementById('root')
);
