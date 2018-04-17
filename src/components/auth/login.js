import React from 'react';
import OktaSignIn from '@okta/okta-signin-widget';

export default class Login extends React.Component{
  constructor(){
    super();
    this.state = { user: null };
    this.widget = new OktaSignIn({
      baseUrl: 'https://dev-733769.oktapreview.com',
      clientId: '0oaeqwuiyb7mjhYwT0h7',
      redirectUri: 'http://ec2-34-207-95-54.compute-1.amazonaws.com:3000'
    });

    this.showLogin = this.showLogin.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount(){
    console.log('componentDidMount...');
    this.widget.session.get((response) => {
      if(response.status !== 'INACTIVE'){
        this.setState({user:response.login});
      }else{
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
      this.showLogin();
    });
  }

  render(){
    console.log('rendering...');
    return(
      <div>
        {this.state.user ? (
          <div className="container">
            <div>Welcome, {this.state.user}!</div>
            <button onClick={this.logout}>Logout</button>
          </div>
        ) : null}
        {this.state.user ? null : (
          <div ref={(div) => {this.loginContainer = div; }} />
        )}
      </div>
    );
  }
}
