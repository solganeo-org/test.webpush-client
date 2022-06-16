const webpush = require('web-push');
var argv = require('minimist')(process.argv.slice(2));

require('dotenv').config();

if (!process.env.ENDPOINT || !process.env.P256DH || !process.env.AUTH) {
  console.log('missing some required parameters');
  return;
}

//Email Public Key, Privite Key 
webpush.setVapidDetails(
  process.env.SUBJECT,
  process.env.PUBLIC_KEY,
  process.env.PRIVATE_KEY
);

const pushSubscription = {
  endpoint: process.env.ENDPOINT,
  keys: {
    auth: process.env.AUTH,
    p256dh: process.env.P256DH,

  }
};

const payload = JSON.stringify({ title: "Test", body: 'Test Notification ',icon:'https://img.icons8.com/pastel-glyph/2x/brain--v2.png',url1:'http://localhost:8888/', url2:'https://www.yahoo.com/Oma',actionName:'archive',actiontitle:'Test_Action' });
webpush.sendNotification(pushSubscription, payload);

console.log("Sent")