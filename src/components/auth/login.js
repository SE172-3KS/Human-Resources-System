import React from 'react';
import OktaSignIn from '@okta/okta-signin-widget';
import '../../style/Login.css';
import Cookies from 'universal-cookie';
import {browserHistory} from 'react-router';
let cookie = new Cookies();

export default class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = { user: this.props.user };
    this.widget = new OktaSignIn({
      baseUrl: 'https://dev-733769.oktapreview.com',
      clientId: '0oaeokpem8vNLSQDH0h7',
      redirectUri: 'http://localhost:3000'
    });

    this.showLogin = this.showLogin.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount(){
    this.widget.session.get((response) => {
      if(response.status !== 'INACTIVE'){
        this.setState({user:response});
        this.props.onAuthChange(response.login);
        cookie.set('userId', response.userId);
        cookie.set('email', response.login);
      }else{
        this.props.onAuthChange(null);
        cookie.remove('userId');
        cookie.remove('email')
        this.showLogin();
      }
    });
  }

  showLogin(){
    Backbone.history.stop();
    this.widget.renderEl({el:this.loginContainer}, 
      (response) => {
        this.setState({user: {login: response.claims.email}});
        this.props.onAuthChange(response.claims.email);
        this.widget.remove();
        cookie.set('userId', response.claims.aud);
        cookie.set('email', response.claims.email);
        browserHistory.push("/")
      },
      (err) => {
        console.log(err);
      }
    );
  }

  logout(){
    this.widget.signOut(() => {
      this.setState({user: null});
      this.props.onAuthChange(null);
      this.showLogin();
      cookie.remove('userId');
      cookie.remove('email');
    });
  }

  render(){
    return(
      <div>
        {this.state.user ? (
          <div>
            <span>Welcome, {this.state.user.login ? this.state.user.login : this.state.user}!</span>
            <button className="btn btn-link" onClick={this.logout}>Logout</button>
          </div>
        ) : null}
        {this.state.user ? null : (
          <div id="login" ref={(div) => {this.loginContainer = div; }} />
        )}
      </div>
    );
  }
}
