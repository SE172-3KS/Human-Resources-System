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
    var sender_batch_id = Math.random().toString(36).substring(9);
    var create_payout_json = {
        "sender_batch_header": {
            "sender_batch_id": sender_batch_id,
            "email_subject": "You have a payment"
        },
        "items": [
            {
                "recipient_type": "EMAIL",
                "amount": {
                    "value": 0,
                    "currency": "USD"
                },
                "receiver": "3ks-test-one@mail.com",
                "note": "Thank you.",
                "sender_item_id": "item_1"
            },
            {
                "recipient_type": "EMAIL",
                "amount": {
                    "value": 0,
                    "currency": "USD"
                },
                "receiver": "3ks-test-two@mail.com",
                "note": "Thank you.",
                "sender_item_id": "item_2"
            }
        ]
    };

    httpService.post({
      url: '/api/makePayout',
      body: {
        id: sender_batch_id,
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
