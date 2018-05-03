import React, {Component} from 'react';
import {Link} from 'react-router';



export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: [],
      id: 0,
      newName: ""
    };
  }


  render() {
    return (
      <div>
        <h1>Charts</h1>

        <li><Link to="gender">Gender Breakdown</Link></li>
        <li><Link to="salary">Average Salaries</Link></li>
      </div>
    );
  }
}
