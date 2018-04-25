export default class PaypalService {
    constructor(){}

    //create a payout object base on given {receiver,value} array
    createBatchPayout(receipients){
        var sender_batch_id = Math.random().toString(36).substring(9);
        var items = []
        for(var i = 0; i < receipients.length; i++){
            items.push(
                {"recipient_type": "EMAIL",
                 "amount": {
                     "value": receipients[i].value,
                     "currency": "USD"
                 },
                 "receiver": receipients[i].receiver,
                 "note": "Payment sent",
                 "sender_item_id": "Receiver "+i
                });
        }
        var create_payout_json = {
            "sender_batch_header": {
                "sender_batch_id": sender_batch_id,
                "email_subject": "You have a payment"
            },
            items
        }
        console.log(JSON.stringify(create_payout_json));
        return create_payout_json;
    }

    //extract relevant information from api's payout detail result
    extractPayoutResult(payout){
        var result = {};
       // console.log(JSON.stringify(payout.items));
        result['batch_id'] = payout.batch_header.payout_batch_id;
        result['status'] = payout.batch_header.batch_status;
        result['time_created'] = payout.batch_header.time_created;
        result['time_completed'] = payout.batch_header.time_completed;
        result['amount'] = payout.batch_header.amount.value;
        result['fees'] = payout.batch_header.fees.value;
        let items = payout.items;
        var transactions = [];
        for(var i = 0; i < items.length; i++){
            transactions.push({
                trans_id: items[i].payout_item_id,
                fee: items[i].payout_item_fee.value,
                amount: items[i].payout_item.amount.value,
                receiver: items[i].payout_item.receiver 
            });
        }
        result['transactions'] = transactions;
       
        console.log(JSON.stringify(result));
        return result;
    }
}

/* Sample payout code
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

paypal.payout.create(create_payout_json, function (error, payout) {
    if (error) {
        console.log(error.response);
        throw error;
    } else {
        console.log("Create Payout Response");
        console.log(payout);
    }
});*/

