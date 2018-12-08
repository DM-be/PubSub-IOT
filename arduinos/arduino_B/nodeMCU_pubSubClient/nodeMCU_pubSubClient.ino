#include <SoftwareSerial.h>
SoftwareSerial s(D6, D5);
#include <ArduinoJson.h>
#include <ESP8266WiFi.h>
#include <PubSubClient.h>   // Read the rest of the article
#include <stdlib.h>


/*
 * from https://mybtechprojects.tech/serial-communication-between-nodemcu-and-arduino/
 */
 /* --- TOPICS ----
 *  soundLevel
 *      soundLevel: string  ---> any message, just a plain message in string format (no JSON) (todo: determine what is low, medium, high sound)
 *  movementDetected
 *      any:any --> any message to this topic will trigger this in the backend for now (todo: do we need some property for this?)
 *  lightStatus
 *      callerId: string --> ARDUINO if arduino or the uid from the firebase user
 *      front end: sends a post to the controller --> backend publishes with message callerid and toggles the light (subscribes to the collection to update the view)
 *      if arduino publishes its callerId to this topic, the light gets toggled
 *      --> when any message is recieved --> toggle the light
 *      
 */


const char* ssid = "Oneplus2";
const char* password =  "ikbeneenhotspot";
const char* mqttServer = "m20.cloudmqtt.com";
const int mqttPort = 12295;
const char* mqttUser = "vqdhgxdd";
const char* mqttPassword = "0zyRZ9ySe5Cn";

WiFiClient espClient;
PubSubClient client(espClient);

 
void setup() {
  // Initialize Serial port
  Serial.begin(9600);
  s.begin(9600);
  while (!Serial) continue;
  
WiFi.begin(ssid, password);
 
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Connecting to WiFi..");
  }
  Serial.println("Connected to the WiFi network");
 
  client.setServer(mqttServer, mqttPort);
  client.setCallback(callback);
 
  while (!client.connected()) {
    Serial.println("Connecting to MQTT...");
 
    if (client.connect("ARDUINO", mqttUser, mqttPassword )) {
 
      Serial.println("connected");  
 
    } else {
 
      Serial.print("failed with state ");
      Serial.print(client.state());
      delay(2000);
 
    }
  }
 
  client.publish("test", "Hello from ESP8266");
  client.subscribe("test");

}

void callback(char* topic, byte* payload, unsigned int length) {
 
  Serial.print("Message arrived in topic: ");
  Serial.println(topic);
 
  Serial.print("Message:");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
 
  Serial.println();
  Serial.println("-----------------------");
 
}
 


void loop() {
  StaticJsonBuffer<1000> jsonBuffer;
  JsonObject& root = jsonBuffer.parseObject(s);
  if (root == JsonObject::invalid())
    return;

  Serial.println("JSON received and parsed");
  root.prettyPrintTo(Serial);
  Serial.print("Data 1 ");
  Serial.println("");
  String data1 = root["soundLevel"];
  Serial.print(data1);
  Serial.print("   Data 2 ");
  String data2 = root["movement"];
  Serial.print(data2);
  Serial.println("");
  Serial.println("---------------------xxxxx--------------------");

  client.publish("soundLevel", data1.c_str());
  client.subscribe("test");
  client.loop();
  delay(3500);

}
