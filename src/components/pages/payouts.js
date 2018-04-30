import React, {Component} from 'react';
import {Link} from 'react-router';
import HttpService from '../../services/http.service';
import PaypalService from '../../services/paypal.service';
import { Table, Tbody, Thead, Th, Tr, Td } from 'reactable';
import '../../style/Payout.css';


let httpService = new HttpService();
let paypalService = new PaypalService();

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payouts: []
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount() {
  	httpService.get({
      url: '/api/listPayouts'
    }).then(result => {
      this.setState({payouts: result.payouts})
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

  getPayoutDetail(id){
  	console.log("Click");

  	httpService.post({
      url: '/api/getPayout',
      body: {
        id: id
      }
    }).then(result => {
      if(result.message === "Success")
        var payout = paypalService.extractPayoutResult(result.payout);
        alert(JSON.stringify(payout));
    });
  }

  // <div className="form">
  //         <input type="number" className="form-control" placeholder="Payout Id"
  //                 name = "payoutId"
  //                 value={this.state.payoutId}
  //                 onChange={this.handleInputChange}/>
  //       </div>


// <Td column="select">
//                 <input type="checkbox" value="" 
//                        onChange={this.onCheckBoxSelected.bind(this, row)}/>
//               </Td>
  render() {
    return (
      <div>
        <h1>Payouts</h1>

        <Table className="table" id="table" itemsPerPage={10} pageButtonLimit={5}> 
          <Thead>
            <Th column="batch_id">Batch Id</Th>
            <Th column="batch_date">Date</Th>
          </Thead>
          {this.state.payouts.map((row) =>
            <Tr id="myRow" key={row.batch_id} onClick={this.getPayoutDetail.bind(this, row.batch_id)}>
              <Td column="batch_id">{row.batch_id}</Td>
              <Td column="batch_date">{row.batch_date}</Td>
            </Tr>)
            }
        </Table>
        

      </div>
    );
  }
}