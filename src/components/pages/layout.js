import React, {Component} from 'react';
import {Link} from 'react-router';

class Layout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      routes: [
        {
          name: 'Employees',
          path: '/employees'
        },
        {
          name: 'Gender',
          path: '/gender'
        }
      ]
    };
  }

  getNavStyle(path) {
    if (this.props.location.pathname === path) {
      return "nav-item nav-link active"
    } else {
      return "nav-item nav-link"
    }
  }

  render() {
    return (
      <div>
        <header>
          <nav className="navbar navbar-expand-lg navbar-light" style={{'backgroundColor': '#e3f2fd'}}>
            <Link className="navbar-brand" to="/">Home</Link>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                {
                  this.state.routes.map((route, index) => {
                    return <Link className={this.getNavStyle(route.path)} to={route.path} key={index}>{route.name}</Link>
                  })
                }
              </div>
            </div>
          </nav>
        </header>

        <div className="container">
          <div>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

export default Layout;
