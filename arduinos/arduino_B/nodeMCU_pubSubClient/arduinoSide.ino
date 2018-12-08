//Arduino code
/*
 * from https://mybtechprojects.tech/serial-communication-between-nodemcu-and-arduino/
 */
#include <SoftwareSerial.h>
#include <ArduinoJson.h>
SoftwareSerial s(5, 6);

void setup() {
  s.begin(9600);
}

void loop() {
  StaticJsonBuffer<200> jsonBuffer;
  JsonObject& root = jsonBuffer.createObject();
  root["soundLevel"] = 30;
  root["movement"] = 0;
  if (s.available() > 0)
  {
    root.printTo(s);
  }
  delay(500);
}
