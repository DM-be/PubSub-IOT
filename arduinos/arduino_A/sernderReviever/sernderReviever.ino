

#include <RH_ASK.h>
#include <SPI.h> // Not actualy used but needed to compile
#include "Timer.h"

RH_ASK driver;


int movementDetectionPin = 3;  
int val = 0;
int pirState = LOW;

int soundLevelMeasurementPin = A0;
Timer t;
 
void setup()
{
  pinMode(movementDetectionPin, INPUT);
  pinMode(soundLevelMeasurementPin, INPUT);
  
  attachInterrupt(digitalPinToInterrupt(movementDetectionPin), sendMovementDetection, RISING);
  int tickEvent = t.every(30000, sendSoundLevelMeasurement, 0); // send soundlevelmeasurement every 30 seconds
    Serial.begin(9600); // Debugging only
    if (!driver.init()){
      Serial.println("init failed");
    }
}

void loop()
{
 t.update(); // let the timer run
}

void sendMovementDetection(){
  Serial.println("HIGH");
  const char *msg = "High World!";
  driver.send((uint8_t *)msg, strlen(msg));
}

void sendSoundLevelMeasurement() {
  int soundLevelMeasurement = analogRead(soundLevelMeasurementPin);
  const char *msg = char(soundLevelMeasurement);
  driver.send((uint8_t *)msg, strlen(msg));
  
  }
