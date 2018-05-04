import React, {Component} from 'react';
import HttpService from '../../services/http.service';
import Employee from '../../model/employee.js';
import '../../style/Employee.css';

let httpService = new HttpService();

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      id: 0,
      newEmployee: false,
      update: false,
      employee: new Employee(0,"","","",new Date(),new Date(),"","",0)//empNo, first, last, gender, dob, hiredate, title, deptno, salary
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getEmployee = this.getEmployee.bind(this);
    this.handleEmpInputChange = this.handleEmpInputChange.bind(this);
    this.createEmployee = this.createEmployee.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);
    this.updateEmployee = this.updateEmployee.bind(this);
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
        employee.birth_date = value;
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

  updateEmployee(){
    var employee = this.state.employee;
    console.log(JSON.stringify(employee));
    httpService.post({
      url: '/api/updateEmployee',
      body: {
        employee: employee
      }
    }).then(result => {
      this.setState({
        message: result.message
      })
    })
  }

  openNewEmployeeForm(updating){
    var curEmp = new Employee(0,"","","",new Date(),new Date(),"","",0);
    if(updating){//empNo, first, last, gender, dob, hiredate, title, deptno, salary
      var message = this.state.message;
      curEmp = new Employee(message.emp_no, message.first_name, 
                                message.last_name, message.gender,
                                message.birth_date, message.hire_date,
                                message.title, message.dept_no, message.salary);
      console.log(JSON.stringify(curEmp));
    }

    this.setState({
      newEmployee: true,
      message: null, 
      update: updating,
      employee: curEmp
    });
  }


  render() {

    var EmployeeInfo = 
    (
      <div className="searchBox">
          <h4 id="title">Employee information</h4>
          <div className="row">
            <div className="col col-lg-2">Name:</div>
            <div className="col">{this.state.message ? this.state.message.first_name + " " + this.state.message.last_name: ""}</div>
          </div>
          <div className="row">
            <div className="col col-lg-2">Gender:</div>
            <div className="col">{this.state.message ? this.state.message.gender : ""}</div>
          </div>
          <div className="row">
            <div className="col col-lg-2">Date Of Birth:</div>
            <div className="col">{this.state.message ? this.state.message.birth_date : ""}</div>
          </div>
          <div className="row">
            <div className="col col-lg-2">Title:</div>
            <div className="col">{this.state.message ? this.state.message.title : ""}</div>
          </div>
          <div className="row">
            <div className="col col-lg-2">Salary:</div>
            <div className="col">{this.state.message ? this.state.message.salary : ""}</div>
          </div>
          <div className="row">
            <div className="col col-lg-2">Department:</div>
            <div className="col">{this.state.message ? this.state.message.dept_no : ""}</div>
          </div>

          <hr></hr>
          
          <button type="button" className="btn btn-info" 
                  onClick={this.openNewEmployeeForm.bind(this,true)}>
                  Update
          </button>
          <button type="button" 
                  className="btn btn-danger" 
                  onClick={this.deleteEmployee}>
                  Delete
          </button>
      </div>
    )

    var NewEmployeeForm = (
        <div className="form">
          <div className="form-row">
            <div className="col-lg-3"><label>Employee Number</label></div>
            <div className="col-lg-8">
              <input type="number" className="form-control" placeholder="Employee Number"
                      name = "emp_no"
                      value={this.state.employee.emp_no}
                      onChange={this.handleEmpInputChange}/>
            </div>
          </div>
          <div className="form-row">
            <div className="col-lg-3"><label>First Name</label></div>
            <div className="col-lg-8">
              <input type="text" className="form-control" placeholder="First Name"
                      name = "first_name"
                      value={this.state.employee.first_name}
                      onChange={this.handleEmpInputChange}/>
            </div>
          </div>
          <div className="form-row">
            <div className="col-lg-3"><label>Last Name</label></div>
            <div className="col-lg-8">
               <input type="text" className="form-control" placeholder="Last Name"
                      name = "last_name"
                      value={this.state.employee.last_name}
                      onChange={this.handleEmpInputChange}/>
            </div>
          </div>
          <div className="form-row">
            <div className="col-lg-3"><label>Gender</label></div>
            <div className="col-lg-8">
               <input type="text" className="form-control" placeholder="Gender"
                      name = "gender"
                      value={this.state.employee.gender}
                      onChange={this.handleEmpInputChange}/>
            </div>
          </div>
          <div className="form-row">
            <div className="col-lg-3"><label>Date of birth</label></div>
            <div className="col-lg-8">
              <input type="date" className="form-control" placeholder="Date of Birth"
                      name = "dob"
                      value={this.state.employee.birth_date}
                      onChange={this.handleEmpInputChange}/>
            </div>
          </div>
          <div className="form-row">
            <div className="col-lg-3"><label>Title</label></div>
            <div className="col-lg-8">
              <input type="text" className="form-control" placeholder="Title"
                      name = "title"
                      value={this.state.employee.title}
                      onChange={this.handleEmpInputChange}/>
            </div>
          </div>
          <div className="form-row">
            <div className="col-lg-3"><label>Hire Date</label></div>
            <div className="col-lg-8">
              <input type="date" className="form-control" placeholder="Hire Date"
                      name = "hire_date"
                      value={this.state.employee.hire_date}
                      onChange={this.handleEmpInputChange}/>
            </div>
          </div>
          <div className="form-row">
            <div className="col-lg-3"><label>Department No</label></div>
            <div className="col-lg-8">
              <input type="text" className="form-control" placeholder="Department Number"
                      name = "dept_no"
                      value={this.state.employee.dept_no}
                      onChange={this.handleEmpInputChange}/>
            </div>
          </div>

          <div className="form-row">
            <div className="col-lg-3"><label>Salary</label></div>
            <div className="col-lg-8">
              <input type="number" className="form-control" placeholder="Salary"
                      name = "salary"
                      value={this.state.employee.salary}
                      onChange={this.handleEmpInputChange}/>
            </div>
          </div>

          <div className="form-row">
            <div className="col-lg-3"></div>
           {!this.state.update && 
            <div className="col-lg-8">
              <button className="btn btn-primary btn-block" onClick={this.createEmployee}>Create</button>
              <p className="link" onClick={this.getEmployee}>View new employee</p>
            </div>
            }
           {this.state.update && <button className="btn btn-primary btn-block" onClick={this.updateEmployee}>Update</button>}
          </div>
          
        </div>
    )

    return (
      <div>
        <h1>Employee Dashboard</h1>
        <div className="form" className="searchBox">
          <div className="form-group row">
            <div className="col-sm-10">
              <input type="number" className="form-control" required 
                     name="id" placeholder="Employee Number"
                     values={this.state.id} onChange={this.handleInputChange}/>
            </div>
            <button className="btn btn-primary" onClick={this.getEmployee}>Search</button>
          </div>
          <p className="link" onClick={this.openNewEmployeeForm.bind(this, false)}>+Add a new employee</p>
        </div>
        

        {this.state.message && EmployeeInfo}
        {this.state.newEmployee && NewEmployeeForm}
        
      </div>
    );
  }
}
