const { v4: uuidv4 } = require('uuid');
const FuelSoap = require('fuel-soap');

const CLIENT_ID = 'v0wfgeyrermojoqjdppqebix';
const CLIENT_SECRET = 'geWFj9iBwMX4XtoqTNRW9eDU'
const SFMC_AUTH_URL = 'https://mcjnmn9mfnxq4m36wvmtt59plqg1.auth.marketingcloudapis.com/v2/token'
const BASE_URI= 'https://mcjnmn9mfnxq4m36wvmtt59plqg1.auth.marketingcloudapis.com/'
const SFMC_DATA_EXTENSION_EXTERNAL_KEY = 'C2CF564D-3A82-4013-9AE4-6B093933B185'
class SFMCHelper {



    static subscribe(pushSubscriptionObject){


        const options = {
            auth: {
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                authVersion: 2,
                authUrl:  SFMC_AUTH_URL,
                authOptions:{
                    authVersion: 2
                }
            }
            , soapEndpoint: BASE_URI
        };

    const client = new FuelSoap(options);   

    const co = {
        "CustomerKey": SFMC_DATA_EXTENSION_EXTERNAL_KEY,
        "Keys":[{"Key":{"Name":"SubscriberKey","Value":uuidv4()}}],
        "Properties":[
            {"Property":
                    [
                        {"Name":"auth","Value":pushSubscriptionObject.keys.auth},
                        {"Name":"p256dh","Value":pushSubscriptionObject.keys.p256dh},
                        {"Name":"endpoint","Value":pushSubscriptionObject.endpoint},
                    ]
            }
        ]
    };

    const uo = {
        SaveOptions: [{ "SaveOption": { PropertyName: "DataExtensionObject", SaveAction: "UpdateAdd" } }]
    };

    client.update('DataExtensionObject',co,uo, function(err, response){
        
        if(err) console.log(err)

        console.log(response.body)

    });

    }

}

module.exports = SFMCHelper