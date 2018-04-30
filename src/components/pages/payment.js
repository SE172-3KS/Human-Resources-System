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
      payoutId: ""
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
    receipients.push({id: row.emp_no, receiver: receiver, value: 0});
    this.setState({receipients: receipients});
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

  getPayoutDetail(){

    var id = this.state.payoutId;

    httpService.post({
      url: '/api/getPayout',
      body: {
        id: id
      }
    }).then(result => {
      if(result.message === "Success")
        var payout = paypalService.extractPayoutResult(result.payout);
       // this.setState({payout: payout});
        alert(JSON.stringify(payout));
    });
  }

  render() {
    return (
      <div>
        <h1>Payments</h1>
        <p id="lastPayout">Last Payout Id: {this.state.payoutId ? this.state.payoutId : "None"}</p>
        <button className="btn btn-primary" 
                onClick={this.sendPayout.bind(this)}>
                Send Payouts
        </button>

          { this.state.payoutId && 
            <button className="btn btn-success" 
                    onClick={this.getPayoutDetail.bind(this)}>
                    View Last Payout Detail
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