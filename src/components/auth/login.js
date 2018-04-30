import React from 'react';
import OktaSignIn from '@okta/okta-signin-widget';
import '../../style/Login.css';

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
    console.log(this.state.user);
    console.log('componentDidMount...');
    this.widget.session.get((response) => {
      if(response.status !== 'INACTIVE'){
        this.setState({user:response.login});
        this.props.onAuthChange(response.login);
      }else{
        this.props.onAuthChange(null);
        this.showLogin();
      }
    });
  }

  showLogin(){
    console.log('showLogin...')
    Backbone.history.stop();
    this.widget.renderEl({el:this.loginContainer}, 
      (response) => {        
        this.setState({user: response.claims.email});
        this.props.onAuthChange(response.claims.email)
        this.widget.remove();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  logout(){
    console.log('logout...');
    this.widget.signOut(() => {
      this.setState({user: null});
      this.props.onAuthChange(null);
      this.showLogin();
    });
  }

  render(){
    console.log('rendering...');
    return(
      <div>
        {this.state.user ? (
          <div>
            <span>Welcome, {this.state.user}!</span>
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
