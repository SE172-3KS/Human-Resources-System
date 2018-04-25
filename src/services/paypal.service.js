export default class PaypalService {
    constructor(){}

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
}







/*
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
