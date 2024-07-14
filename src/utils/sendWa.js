// import createTwilioClient from '@galaxybuilder/wabot';
import { Client } from "twilio-chat";

// const accountSid = import.meta.env.VITE_ACCOUNTSID;
const authToken = import.meta.env.VITE_AUTHTOKEN;
const client = new Client(authToken);
client.connectionState = "CONNECTED";
// Before you use the client, subscribe to the `'stateChanged'` event and wait
// for the `'initialized'` state to be reported.
export const run = () => {
  // client.onWithReplay
  //   .create({
  //     body: "tes",
  //     from: "whatsapp:+14155238886",
  //     to: "whatsapp:+6285314793866",
  //   })
  //   .then((message) => console.log(message.sid));
  client.onWithReplay("stateChanged", (state) => {
    if (state === "initialized") {
      console.log(state);
    }
  });
};
// // const client = require('twilio')(accountSid, authToken);

// const client = createTwilioClient(accountSid, authToken);

// export const sendMessage = (message) => {
//   client.messages
//     .create({
//       body: 'tes',
//       from: "whatsapp:+14155238886",
//       to: "whatsapp:+6285314793866",
//     })
//     .then((message) => console.log(message.sid));
// };
