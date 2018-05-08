import React, {Component} from 'react';
import {Link} from 'react-router';
import HttpService from '../../services/http.service';
import PaypalService from '../../services/paypal.service';
import '../../style/Payment.css';
import { Table, Tbody, Thead, Th, Tr, Td } from 'reactable';


let httpService = new HttpService();
let paypalService = new PaypalService();

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "Payout page",
      payout: null,
      employees: [],
      receipients: [],
      payoutId: "",
      amount:0
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount() {
    httpService.get({
      url: '/api/listEmployees'
    }).then(result => {
      this.setState({employees: result.message})
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

  onCheckBoxSelected(row) {
    console.log("here");

    var receipients = this.state.receipients.slice();
    
    for(var i = 0; i < receipients.length; i++){
      if(receipients[i].id == row.emp_no){
        console.log("same");
        receipients.splice(i, 1);
        this.setState({receipients: receipients});
        return;
      }
    }

    var receiver = row.first_name + "."+row.emp_no+"."+row.last_name+"@fakecompany.com";
    var amount = this.state.amount/100.0; //divide by hundred because api funding is limited 
    receipients.push({id: row.emp_no, receiver: receiver, value: amount}); 
    this.setState({receipients: receipients});
    console.log(JSON.stringify(receipients));
  }

  sendPayout(){
    var receipients = this.state.receipients.slice();

    var create_payout_json = paypalService.createBatchPayout(receipients);

    httpService.post({
      url: '/api/makePayout',
      body: {
        create_payout: create_payout_json
      }
    }).then(result => {
      this.setState({
        message: result.message,
        payoutId: result.message
      });
    });
  }

  render() {
    return (
      <div>
        <h1>Payments</h1>
        <p id="lastPayout">Last Payout Id: {this.state.payoutId ? this.state.payoutId : "None"}</p>

        <div className="form-inline">
          <div className="form-group mb-2">
            <label className="mr-2">Amount</label>
            <input type="number" className="mr-2" name="amount" 
                    value={this.state.amount} placeholder="Payout Amount"
                    onChange={this.handleInputChange}/>
          </div>
          <button className="btn btn-primary" 
                  onClick={this.sendPayout.bind(this)}>
                  Send Payouts
          </button>
        </div>

        { this.state.payoutId && 
          <button className="btn btn-success">
            <Link id="white" to={`payout/${this.state.payoutId}`}>View Last Payout Detail</Link>
          </button>
        }

        <hr></hr>

        <Table className="table" id="table" itemsPerPage={10} pageButtonLimit={5}> 
          <Thead>
            <Th column="select">Select</Th>
            <Th column="emp_no">Employee Number</Th>
            <Th column="birth_date">Birth Date</Th>
            <Th column="first_name">First Name</Th>
            <Th column="last_name">Last Name</Th>
            <Th column="gender">Gender</Th>
            <Th column="hire_date">Hire Date</Th>
          </Thead>
          {this.state.employees.map((row) =>
            <Tr key={row.emp_no}>
              <Td column="select">
                <input type="checkbox" value="" 
                       onChange={this.onCheckBoxSelected.bind(this, row)}/>
              </Td>
              <Td column="emp_no">{row.emp_no}</Td>
              <Td column="birth_date">{row.birth_date}</Td>
              <Td column="first_name">{row.first_name}</Td>
              <Td column="last_name">{row.last_name}</Td>
              <Td column="gender">{row.gender}</Td>
              <Td column="hire_date">{row.hire_date}</Td>
            </Tr>)
            }
          
        </Table>
        

      </div>
    );
  }
}