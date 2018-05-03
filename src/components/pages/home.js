import React, {Component} from 'react';
import {Link} from 'react-router';
import HttpService from '../../services/http.service'

let httpService = new HttpService();

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };
  }

  render() {
    return (
      <div>
        <h1>Home</h1>
      </div>
    );
  }
}
