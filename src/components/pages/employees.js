import React, {Component} from 'react';
import HttpService from '../../services/http.service'

let httpService = new HttpService();

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: [],
      id: 0,
      newName: ""
    };
  }

  componentWillMount() {
    httpService.get({
      url: '/api/listEmployees'
    }).then(result => {
      this.setState({message: result.message})
    })
  }

  getEmployee() {
    var id = this.state.id;
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
    var id = this.state.id;
    alert("Creating dummy employee with name Dummy Dumb");
    httpService.post({
      url: '/api/createEmployee',
      body: {
        firstName: 'Dummy',
        lastName: 'Dumb',
        emp_no: id
      }
    }).then(result => {
      this.setState({message: result.message})
    })
  }

  updateEmployee() {
    var id = this.state.id;
    var newFirstName = this.state.newName;
    httpService.post({
      url: '/api/updateEmployee',
      body: {
        emp_no: id,
        first_name: newFirstName
      }
    }).then(result => {
      //this.setState({message: result.message})
      httpService.get({
        url: '/api/listEmployees'
      }).then(result => {
        this.setState({message: result.message})
      })
    })
  }

  deleteEmployee() {
    var id = this.state.id;
    console.log(id);
    httpService.post({
      url: '/api/deleteEmployee',
      body: {
        emp_no: id
      }
    }).then(result => {
      //this.setState({result: result.result})
      httpService.get({
        url: '/api/listEmployees'
      }).then(result => {
        console.log(JSON.stringify(result.message));
        this.setState({message: result.message})
      })
    })
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }


  render() {
    return (
      <div>
        <h1>Employees</h1>
        <div>
          <label>emp_no:</label>
          <input type="number" name="id" values={this.state.id} onChange={this.handleInputChange.bind(this)}></input>

          <label>New First Name:</label>
          <input type="text" name="newName" values={this.state.newName} onChange={this.handleInputChange.bind(this)}></input>
        </div>

        <button onClick={this.getEmployee.bind(this)}>Get Employee (emp_no)</button>
        <button onClick={this.createEmployee.bind(this)}>Create Employee</button>
        <button onClick={this.updateEmployee.bind(this)}>Update Employee</button>
        <button onClick={this.deleteEmployee.bind(this)}>Delete Employee</button>


        <div>
          <p><b>Test intructions</b></p>
          <p>Get employee: enter emp_no (correct one) and hit the button</p>
          <p>Create employee: enter emp_no (new unique one) and hit the button</p>
          <p>Update employee: enter emp_no (correct one) and new name hit the button</p>
          <p>Delete employee: enter emp_no (correct one) and hit the button</p>
        </div>

        <table>
          <tr>
            <th>Employee Number</th>
            <th>Birth Date</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>Hire Date</th>
          </tr>
          <tbody>
            {this.state.message.map((row) =>
              <tr key={row.emp_no}>
                <td>{row.emp_no}</td>
                <td>{row.birth_date}</td>
                <td>{row.first_name}</td>
                <td>{row.last_name}</td>
                <td>{row.gender}</td>
                <td>{row.hire_date}</td>
              </tr>)
            }
          </tbody>
        </table>
      </div>
    );
  }
}
