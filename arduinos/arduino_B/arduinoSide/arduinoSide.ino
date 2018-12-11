//Arduino code
/*
   from https://mybtechprojects.tech/serial-communication-between-nodemcu-and-arduino/
*/
#include <SoftwareSerial.h>
#include <ArduinoJson.h>
SoftwareSerial s(5, 6);
#include <RH_ASK.h>
#include <SPI.h> // Not actualy used but needed to compile

RH_ASK driver;
int led = 13;

void setup() {
  pinMode(led, OUTPUT);
  digitalWrite(led, HIGH);
  s.begin(9600);
  Serial.begin(9600); // Debugging only
  if (!driver.init())
    Serial.println("init failed");
}

void loop() {
  uint8_t buf[12];
  uint8_t buflen = sizeof(buf);
  if (driver.recv(buf, &buflen)) // Non-blocking
  {
    int i;
    // Message with a good checksum received, dump it.

    String msg = (char*)buf;
    Serial.println(msg);
    if (s.available() > 0) {
      s.write(msg.c_str());
    }
  }
  delay(500);
}
