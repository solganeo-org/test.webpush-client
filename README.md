# test.webpush-client
Test Project to generate an endpoint, mount a service worker and start receiving Notifications using webpush protocol.

# Local Test

    npm install
    npm run dev

After this, open a browser and go to `http://localhost:3000/`

Accept the notifications and you should see the messages in the console.

Create a .env file on the root folder

    PORT=3001
    ENDPOINT=https://updates.push.services.mozilla.com/wpush/v2/gAAAAABiqzuJmjwSasRi495T7Trh2oI1jT2lqEfWm2_8q242KN5HFQV0xz8_BpNzoeJ5gxUMkQTFEr1sbDylQClB9fLNm9YnhQO-Cp8sP4chNUk4R0fMpSYvp8V2Y5y3YboJzYsIIxnRXpBaiINN01Hh8XvkmtLWRtRxfFyodx9Z2tI_fSwJP4I
    AUTH=wDNSNR7Ys2RhJWway6G3cg
    P256DH=BClkO6H3zeCUShhDZG4UxPlYh0DdaJ4GpCgfQUQ6p_2WKYOU4wUiaovjZ83xtffHmcolHPYZ_TE462AXSVVhWZE
    SUBJECT=mailto:r.zuniga@solganeo.com
    PUBLIC_KEY=BNrknLI66MNnJC5gFrzOOuDKGeK5K3S2jzRSOHeSPqIVqwIzVwjRbNvGbfsBfXc_Yvcgxf5eMTz9P2WcgGXgEws
    PRIVATE_KEY=ctPxjAFkFQiMFeIy1Pu-5uXqQYtAkFf79CHjbarg0fw

Replace ENDPOINT for your endpoint, AUTH for your authorization, P256DH for your public key.

Finally to send a notification, you can use the following command:

    npm run send

You should see the notification in the browser 🚀