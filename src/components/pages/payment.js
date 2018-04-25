import React, {Component} from 'react';
import {Link} from 'react-router';
import HttpService from '../../services/http.service';
import PaypalService from '../../services/paypal.service';


let httpService = new HttpService();
let paypalService = new PaypalService();

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "Payout page",

    };
  }

  sendPayout(){
    var receipients = [
    { 
      value: 0,
      receiver: "3ks-test-one@gmail.com"
    },{
      value: 0,
      receiver: "3ks-test-two@gmail.com"
    }];
    var create_payout_json = paypalService.createBatchPayout(receipients);

    httpService.post({
      url: '/api/makePayout',
      body: {
        create_payout: create_payout_json
      }
    }).then(result => {
      this.setState({message: result.message});
    });
  }

  getPayout(id){
    httpService.post({
      url: '/api/getPayout',
      body: {
        id: id
      }
    }).then(result => {
      this.setState({message: result.message});
    });
  }

  render() {
    return (
      <div>
        <h1>Payout Test</h1>
        <p>{this.state.message}</p>
        <button onClick={this.sendPayout.bind(this)}>Send test payout</button>
        <button onClick={this.getPayout.bind(this, '3AY8Q6XBVM37G')}>Get test payout</button>
      </div>
    );
  }
}
