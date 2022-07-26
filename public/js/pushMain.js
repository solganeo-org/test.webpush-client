var callwebService = false;
var permission = Notification.permission;

function notifyMe(){

    if ('serviceWorker' in navigator && 'PushManager' in window) {
        Notification.requestPermission().then(function (result) {
            if (result === 'granted') {
                navigator.serviceWorker.register('sw.js');
                navigator.serviceWorker.ready.then(function (registration) {
                    registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlB64ToUint8Array('BNrknLI66MNnJC5gFrzOOuDKGeK5K3S2jzRSOHeSPqIVqwIzVwjRbNvGbfsBfXc_Yvcgxf5eMTz9P2WcgGXgEws')
                    }).then(function (pushSubscription) {

                        let pushSubscriptionObject = pushSubscription.toJSON()

                        console.log(pushSubscriptionObject)

                        $.ajax({
                            type: "POST",
                            url: "/sfmc/subscribe",
                            contentType: "application/json; charset=utf-8",
                            data: JSON.stringify(pushSubscriptionObject),
                            success: function(data){

                                console.log(data)

                            },
                          });

                    });
                })
            } else {
                document.querySelector('#subscriptionInformations').textContent = 'Autorization denied :\'(';
            }
        });
    } else {
        document.querySelector('#subscriptionInformations').innerHTML = `Sorry, your browser doesn't support <a href="https://www.caniuse.com/#search=service%20worker" target="_blank">service worker</a> or <a href="https://www.caniuse.com/#search=push%20api" target="_blank">push api</a> :\'(`;
    }

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

