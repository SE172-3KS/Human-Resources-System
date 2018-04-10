import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import Home from './components/pages/home.js';
import Layout from './components/pages/layout.js';
import AnotherPage from './components/pages/another-page.js';

ReactDOM.render(
    <Router history={browserHistory}>
      	<Route path="/" component={Layout}>
        	<IndexRoute component={Home}/>
            <Route path="/another-page" component={AnotherPage}/>
      	</Route>
    </Router>,
    document.getElementById('root')
);