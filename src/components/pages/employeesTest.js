import React, {Component} from 'react';
import HttpService from '../../services/http.service'

let httpService = new HttpService();

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      id: 0
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getEmployee = this.getEmployee.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  getEmployee() {
    var id = this.state.id;
    httpService.post({
      url: '/api/getEmployee',
      body: {
        id: id
      }
    }).then(result => {
      console.log(JSON.stringify(result.message));
      this.setState({message: result.message})
    })
  }

  render() {

    var EmployeeInfo = 
    (
      <div>
          <h3>Employee information</h3>
          <h3>General</h3>
          <div>
            <p>Name: {this.state.message ? this.state.message.first_name + this.state.message.last_name: ""}</p>
            <p>Gender: {this.state.message ? this.state.message.gender : ""}</p>
            <p>DOB: {this.state.message ? this.state.message.birth_date : ""}</p>
            <p>Hire Date: {this.state.message ? this.state.message.hire_date : ""} </p>
          </div>
          <h3>Company</h3>
          <div>
            Title<br></br>
            Department<br></br>
            Manager<br></br>
          </div>
      </div>
    )

    return (
      <div>
        <h1>Employee Dashboard</h1>
        <div className="form">
          <div className="form-group row">
            <div className="col-sm-10">
              <input type="number" className="form-control" 
                     name="id" placeholder="Employee Number"
                     values={this.state.id} onChange={this.handleInputChange}/>
            </div>
            <button className="btn btn-primary" onClick={this.getEmployee}>Search</button>
          </div>
        </div>
        <p>+Add a new employee</p>

        {this.state.message && EmployeeInfo}

        
      </div>
    );
  }
}
