import React, {Component} from 'react';
import {Link} from 'react-router';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };
  }

  componentWillMount() {
    fetch('/api/listEmployees').then(response => {
      return response.json()
    }).then(result => {
      this.setState({message: result.message})
    });
  }

  render() {
    return (
      <div>
        <h1>Statistics</h1>
        <p>{this.state.message}</p>
        <li><Link to="login">Login</Link></li>
      </div>
    );
  }
}
