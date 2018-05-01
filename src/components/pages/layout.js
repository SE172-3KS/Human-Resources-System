import React, {Component} from 'react';
import {Link} from 'react-router';
import '../../style/Layout.css';
import Login from '../auth/login.js';

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
        },{
          name: 'Payment',
          path: '/payment'
        }
        ,{
          name: 'Payout',
          path: '/payout'
        }
      ],
      user:null
    };
    this.onAuthChange = this.onAuthChange.bind(this);
  }

  onAuthChange(state){
    if(state){
      this.setState({user: state});
    }else this.setState({user: null});
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
      <div id="background">
        <header>
          <nav className="navbar navbar-expand-lg navbar-light" style={{'backgroundColor': '#e3f2fd'}}>
            <Link className="navbar-brand" to="/">Home</Link>
            {
              this.state.user &&
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                  {
                    this.state.routes.map((route, index) => {
                      return <Link className={this.getNavStyle(route.path)} to={route.path} key={index}>{route.name}</Link>
                    })
                  }
                </div>
              </div>
            }
            <Login user={this.state.user} onAuthChange={this.onAuthChange}></Login>
          </nav>
        </header>

        
        {this.state.user && 
          <div className="container">
            <div>
              {this.props.children}
            </div>
          </div>
        }
        
      </div>
    )
  }
}

export default Layout;
