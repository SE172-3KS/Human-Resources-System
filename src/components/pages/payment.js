import React, {Component} from 'react';
import {Link} from 'react-router';
import HttpService from '../../services/http.service'

let httpService = new HttpService();

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "Payout page",

    };
  }

  componentWillMount() {
   
  }

  sendPayout(){
    var sender_batch_id = Math.random().toString(36).substring(9);
    console.log(sender_batch_id);
    var create_payout_json = {
        "sender_batch_header": {
            "sender_batch_id": sender_batch_id,
            "email_subject": "You have a payment"
        },
        "items": [
            {
                "recipient_type": "EMAIL",
                "amount": {
                    "value": 0.01,
                    "currency": "USD"
                },
                "receiver": "shirt-supplier-one@mail.com",
                "note": "Thank you.",
                "sender_item_id": "item_1"
            },
            {
                "recipient_type": "EMAIL",
                "amount": {
                    "value": 0.01,
                    "currency": "USD"
                },
                "receiver": "shirt-supplier-two@mail.com",
                "note": "Thank you.",
                "sender_item_id": "item_2"
            }
        ]
    };
  }

  render() {
    return (
      <div>
        <h1>Payout Test</h1>
        <p>{this.state.message}</p>
        <button onClick={this.sendPayout.bind(this)}>Send test payout</button>
      </div>
    );
  }
}
