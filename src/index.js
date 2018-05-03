import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';

import Home from './components/pages/home.js';
import Layout from './components/pages/layout.js';
import Employees from './components/pages/employees.js';
import Login from './components/auth/login';
import Gender from './components/pages/gender.js';
import Charts from './components/pages/charts.js';
import Salary from './components/pages/salary.js';
import Payment from './components/pages/payment.js';
import Payout from './components/pages/payouts.js';
import PayoutDetail from './components/pages/payoutDetail.js'


ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Employees}/>
      <Route path="/login" component={Login}/>
      <Route path="/employees" component={Employees}/>
      <Route path="/charts" component={Charts}/>
      <Route path="/gender" component={Gender}/>
      <Route path="/salary" component={Salary}/>
      <Route path="/payment" component={Payment}/>
      <Route path="/payout" component={Payout}/>
      <Route path="/payout/:id" component={PayoutDetail}/>
    </Route>
  </Router>,
  document.getElementById('root')
);
