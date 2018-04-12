import React, {Component} from 'react';
import HttpService from '../../services/http.service'

let httpService = new HttpService();

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };
  }

  componentWillMount() {
    httpService.get({
      url: '/api/listEmployees'
    }).then(result => {
      this.setState({message: result.message})
    })
  }

  getEmployee(id) {
    httpService.post({
      url: '/api/getEmployee',
      body: {
        id: id
      }
    }).then(result => {
      this.setState({message: result.message})
    })
  }

  createEmployee() {
    httpService.post({
      url: '/api/createEmployee',
      body: {
        firstName: 'Seling',
        lastName: 'Chen'
      }
    }).then(result => {
      this.setState({message: result.message})
    })
  }

  updateEmployee() {
    httpService.post({
      url: '/api/updateEmployee',
      body: {
        id: 6,
        firstName: 'Seling2',
        lastName: 'Chen2'
      }
    }).then(result => {
      this.setState({message: result.message})
    })
  }

  deleteEmployee() {
    httpService.post({
      url: '/api/deleteEmployee',
      body: {
        id: 6
      }
    }).then(result => {
      this.setState({message: result.message})
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