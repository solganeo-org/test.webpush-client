var callwebService = false;
var permission = Notification.permission;
if(permission === 'default' ){
    callwebService = true ;
}
if ('serviceWorker' in navigator && 'PushManager' in window) {
    Notification.requestPermission().then(function (result) {
        if (result === 'granted') {
            navigator.serviceWorker.register('sw.js');
            navigator.serviceWorker.ready.then(function (registration) {
                registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlB64ToUint8Array('BNrknLI66MNnJC5gFrzOOuDKGeK5K3S2jzRSOHeSPqIVqwIzVwjRbNvGbfsBfXc_Yvcgxf5eMTz9P2WcgGXgEws')
                }).then(function (pushSubscription) {
                    console.info('Subscription informations', JSON.stringify(pushSubscription));
                    console.log(pushSubscription.endpoint)

                    console.log('@@subscriptionId: '+pushSubscription.subscriptionId)

                    if(callwebService){

                    }
                });
            })
        } else {
            document.querySelector('#subscriptionInformations').textContent = 'Autorization denied :\'(';
        }
    });
} else {
    document.querySelector('#subscriptionInformations').innerHTML = `Sorry, your browser doesn't support <a href="https://www.caniuse.com/#search=service%20worker" target="_blank">service worker</a> or <a href="https://www.caniuse.com/#search=push%20api" target="_blank">push api</a> :\'(`;
}

function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

function renderSubscriptionInformations(subscription) {
    subscription = JSON.parse(JSON.stringify(subscription));
    const nodeCommand = `node send-push.js --endpoint=${subscription.endpoint} --auth=${subscription.keys.auth} --p256dh=${subscription.keys.p256dh}`;
    document.querySelector('#subscriptionInformations').innerHTML = `<h2>Subscription informations</h2>
    <table>
            <tr>
                <td>Endpoint</td>
                <td>${subscription.endpoint}</td>
            </tr>
            <tr>
                <td>Auth key</td>
                <td>${subscription.keys.auth}</td>
            </tr>
            <tr>
                <td>Auth p256dh</td>
                <td>${subscription.keys.p256dh}</td>
            </tr>
        </table>
        <h2>Send notification</h2>
        <div>Execute the following command from the /server folder to send a push notification</div>
        <div class='command'>${nodeCommand}</div>`;
}

