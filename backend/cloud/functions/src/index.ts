import * as functions from 'firebase-functions';
import * as mqtt from 'mqtt';
let counter = 0;


const options = {
  port: 12295,
  host: "mqtt://m20.cloudmqtt.com",
  clientId:
    "mqttjs_" +
    Math.random()
      .toString(16)
      .substr(2, 8),
  username: "vqdhgxdd",
  password: "0zyRZ9ySe5Cn",
  keepalive: 60,
  reconnectPeriod: 1000,
  protocolId: "MQIsdp",
  protocolVersion: 3,
  clean: true,
  encoding: "utf8"
};
const client = mqtt.connect(
  "mqtt://m20.cloudmqtt.com",
  options
);

client.on("connect", function() {
  client.subscribe("soundLevel");
  client.subscribe("movementDetected");
});

client.on("message", function(topic, message) {
  if(topic.toString() === 'movementDetected') {
    console.log('movement');
    counter += 1;
    handleMovementDetection();

  }
  else if(topic.toString() === 'soundLevel') {

  }
});


function handleMovementDetection() {
};

function handleSoundLevel(message) {

}

export const helloWorld = functions.https.onRequest((request, response) => {
 response.send(counter.toString());
});







// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
