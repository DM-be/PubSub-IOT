

#include <RH_ASK.h>
#include <SPI.h> // Not actualy used but needed to compile

RH_ASK driver;
int inputPin = 3;  
int val = 0;
int pirState = LOW;

void setup()
{
  pinMode(inputPin, INPUT);     // declare sensor as input
  attachInterrupt(digitalPinToInterrupt(inputPin), isr, RISING);
  
    Serial.begin(9600); // Debugging only
    if (!driver.init()){
      Serial.println("init failed");
    }
}

void loop()
{
 
}

void isr(){
  Serial.println("HIGH");
  const char *msg = "High World!";
  driver.send((uint8_t *)msg, strlen(msg));
}
