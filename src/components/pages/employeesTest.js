import React, {Component} from 'react';
import HttpService from '../../services/http.service';
import Employee from '../../model/employee.js';

let httpService = new HttpService();

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      id: 0,
      newEmployee: false,
      employee: new Employee(0,"","","",new Date(),new Date(),"","",0)//empNo, first, last, gender, dob, hiredate, title, deptno, salary
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getEmployee = this.getEmployee.bind(this);
    this.openNewEmployeeForm = this.openNewEmployeeForm.bind(this);
    this.handleEmpInputChange = this.handleEmpInputChange.bind(this);
    this.createEmployee = this.createEmployee.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleEmpInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    var employee = this.state.employee;
    switch(name) {
      case 'first_name':
        employee.first_name = value;
        break;
      case 'last_name':
        employee.last_name = value;
        break;
      case 'emp_no':
        employee.emp_no = value;
        break;
      case 'gender':
        employee.gender = value;
        break;
      case 'hire_date':
        employee.hire_date = value;
        break;
      case 'title':
        employee.title = value;
        break;
      case 'salary':
        employee.salary = value;
        break;
      case 'dept_no':
        employee.dept_no = value;
        break;
      case 'dob':
        employee.dob = value;
        break;
    }

    this.setState({
      employee: employee
    });
  }

  createEmployee(){
    var employee = this.state.employee;
    this.setState({id: employee.emp_no});
    console.log(JSON.stringify(employee));
    httpService.post({
      url: '/api/createEmployee',
      body: {
        employee: employee
      }
    }).then(result => {
     this.setState({
        message: result.message
      })
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
      console.log(JSON.stringify(result.message));
      this.setState({message: result.message, newEmployee: false})
    })
  }

  deleteEmployee(){
    var id = this.state.id;
    httpService.post({
      url: '/api/deleteEmployee',
      body: {
        emp_no: id
      }
    }).then(result => {
      this.setState({message: null});
    })
  }

  openNewEmployeeForm(){
    this.setState({newEmployee: true, message: null});
  }


  render() {

    var EmployeeInfo = 
    (
      <div>
          <h3>Employee information <i className="fas fa-trash-alt" onClick={this.deleteEmployee}></i></h3>
          <h3>General</h3>
          <div>
            <p>Name: {this.state.message ? this.state.message.first_name + " " + this.state.message.last_name: ""}</p>
            <p>Gender: {this.state.message ? this.state.message.gender : ""}</p>
            <p>DOB: {this.state.message ? this.state.message.birth_date : ""}</p>
            <p>Hire Date: {this.state.message ? this.state.message.hire_date : ""} </p>
          </div>
          <h3>Company</h3>
          <div>
            <p>Title: {this.state.message ? this.state.message.title : ""}</p>
            <p>Salary: {this.state.message ? this.state.message.salary : ""}</p>
            <p>Department: {this.state.message ? this.state.message.dept_no : ""}</p>
          </div>
      </div>
    )

    var NewEmployeeForm = (
        <div className="form">
          <div className="form-group">
            <label>Employee Number</label>
            <input type="number" className="form-control" placeholder="Employee Number"
                    name = "emp_no"
                    values={this.state.employee.emp_no}
                    onChange={this.handleEmpInputChange}/>
          </div>
          <div className="form-group">
            <label>First Name</label>
            <input type="text" className="form-control" placeholder="First Name"
                    name = "first_name"
                    values={this.state.employee.first_name}
                    onChange={this.handleEmpInputChange}/>
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" className="form-control" placeholder="Last Name"
                    name = "last_name"
                    values={this.state.employee.last_name}
                    onChange={this.handleEmpInputChange}/>
          </div>
          <div className="form-group">
            <label>Gender</label>
            <input type="text" className="form-control" placeholder="Gender"
                    name = "gender"
                    values={this.state.employee.gender}
                    onChange={this.handleEmpInputChange}/>
          </div>
          <div className="form-group">
            <label>DOB</label>
            <input type="date" className="form-control" placeholder="Date of Birth"
                    name = "dob"
                    values={this.state.employee.dob}
                    onChange={this.handleEmpInputChange}/>
          </div>
          <div className="form-group">
            <label>Hire Date</label>
            <input type="date" className="form-control" placeholder="Hire Date"
                    name = "hire_date"
                    values={this.state.employee.hire_date}
                    onChange={this.handleEmpInputChange}/>
          </div>
          <div className="form-group">
            <label>Title</label>
            <input type="text" className="form-control" placeholder="Title"
                    name = "title"
                    values={this.state.employee.title}
                    onChange={this.handleEmpInputChange}/>
          </div>
          <div className="form-group">
            <label>Department Number</label>
            <input type="text" className="form-control" placeholder="Department Number"
                    name = "dept_no"
                    values={this.state.employee.dept_no}
                    onChange={this.handleEmpInputChange}/>
          </div>
          <div className="form-group">
            <label>Salary</label>
            <input type="number" className="form-control" placeholder="Salary"
                    name = "salary"
                    values={this.state.employee.salary}
                    onChange={this.handleEmpInputChange}/>
          </div>
          <div className="form-group">
           <button className="btn btn-primary btn-block" onClick={this.createEmployee}>Create</button>
          </div>
          <p>New employee with id = {this.state.employee.emp_no} created</p>
          <p onClick={this.getEmployee}>--> View</p>
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
        <p onClick={this.openNewEmployeeForm}>+Add a new employee</p>

        {this.state.message && EmployeeInfo}
        {this.state.newEmployee && NewEmployeeForm}
        
      </div>
    );
  }
}
