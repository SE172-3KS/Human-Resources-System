import React, {Component} from 'react';

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

  getEmployee(id) {
    fetch('/api/getEmployee', {
      body: JSON.stringify({
        id: id
      }),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST'
    }).then(response => {
      return response.json();
    }).then(result => {
      this.setState({message: result.message});
    })
  }

  createEmployee() {
    fetch('/api/createEmployee', {
      body: JSON.stringify({
        firstName: 'Seling',
        lastName: 'Chen'
      }),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST'
    }).then(response => {
      return response.json();
    }).then(result => {
      this.setState({message: result.message});
    })
  }

  updateEmployee() {
    fetch('/api/updateEmployee', {
      body: JSON.stringify({
        id: 6,
        firstName: 'Seling2',
        lastName: 'Chen2'
      }),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST'
    }).then(response => {
      return response.json();
    }).then(result => {
      this.setState({message: result.message});
    })
  }

  deleteEmployee() {
    fetch('/api/deleteEmployee', {
      body: JSON.stringify({
        id: 6
      }),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST'
    }).then(response => {
      return response.json();
    }).then(result => {
      this.setState({message: result.message});
    })
  }

  render() {
    return (
      <div>
        <h1>Employees</h1>
        <p>{this.state.message}</p>
        <button onClick={this.getEmployee.bind(this, 6)}>Employee Id: 6</button>
        <button onClick={this.createEmployee.bind(this)}>Create Employee</button>
        <button onClick={this.updateEmployee.bind(this)}>Update Employee</button>
        <button onClick={this.deleteEmployee.bind(this)}>Delete Employee</button>
      </div>
    );
  }
}