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
      id: this.props.params.id,
      detail: null
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount(){
    console.log("Click");
    var id = this.state.id;

    httpService.post({
      url: '/api/getPayout',
      body: {
        id: id
      }
    }).then(result => {
      if(result.message === "Success")
        var payout = paypalService.extractPayoutResult(result.payout);
        this.setState({detail: payout});
        console.log(JSON.stringify(payout));
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  // {
  //   "batch_id":"B64VKWKMY6HJY",
  //   "status":"SUCCESS",
  //   "time_created":"2018-04-25T01:17:43Z",
  //   "time_completed":"2018-04-25T05:02:02Z",
  //   "amount":"0.0",
  //   "fees":"0.0",
  //   "transactions":
  //     [{"trans_id":"GWEF5XPR8MXCS",
  //       "fee":"0.0",
  //       "amount":"0.0",
  //       "receiver":"3ks-test-one@mail.com"
  //       },
  //       {
  //         "trans_id":"N2ZP3FXQ88QAL",
  //         "fee":"0.0",
  //         "amount":"0.0",
  //         "receiver":"3ks-test-two@mail.com"
  //       }
  //     ]
  // }

  
  render() {
    return (
      <div>
      {this.state.detail && <div>
        <h3>Payout detail</h3>
        <div className="row">
          <div className="col col-lg-2">
            Batch Id: 
          </div>
          <div className="col col-lg-5">
            {this.state.detail.batch_id}
          </div>
        </div>
        <div className="row">
          <div className="col col-lg-2">
            Status:
          </div>
          <div className="col col-lg-5">
            {this.state.detail.status}
          </div>
        </div>
        <div className="row">
          <div className="col col-lg-2">
            Time Created:
          </div>
          <div className="col col-lg-5">
          {this.state.detail.time_created}
          </div>
        </div>
        <div className="row">
          <div className="col col-lg-2">
            Time Completed:
          </div>
          <div className="col col-lg-5">
            {this.state.detail.time_completed}
          </div>
        </div>
        <div className="row">
          <div className="col col-lg-2">
            Amount:
          </div>
          <div className="col col-lg-5">
            {this.state.detail.amount * 100}
          </div>
        </div>
        <div className="row">
          <div className="col col-lg-2">
            Fee:
          </div>
          <div className="col col-lg-5">
            {this.state.detail.fees * 100}
          </div>
        </div>

        <h3>Transactions</h3>
       
        {
          this.state.detail.transactions.map((transaction) =>
            <div key={transaction.trans_id}>
              <div className="row">
                  <div className="col col-lg-2">
                    Transaction Id:
                  </div>
                  <div className="col col-lg-5">
                    {transaction.trans_id}
                  </div>
              </div>
              <div className="row">
                <div className="col col-lg-2">
                  Receiver:
                </div>
                <div className="col col-lg-5">
                  {transaction.receiver}
                </div>
              </div>
              <div className="row">
                <div className="col col-lg-2">
                  Amount:
                </div>
                <div className="col col-lg-5">
                  {transaction.amount * 100}
                </div>
              </div>
              <div className="row">
                <div className="col col-lg-2">
                  Fee:
                </div>
                <div className="col col-lg-5">
                  {transaction.fee * 100}
                </div>
              </div>

              <hr></hr>
            </div>
          )
        }
        </div>}
      </div>
    );
  }
}
/*
*/