#include <ArduinoJson.h>
#include <HTTPClient.h>
#include <WiFiMulti.h>
#include <Wiegand.h>


#define PIN_D0 27
#define PIN_D1 14

WiFiMulti wifiMulti;
Wiegand wiegand;

const char *AP_SSID = "BUP";
const char *AP_PWD = "belprom1";

//String testArray = {};

//const char *AP_SSID = "WiFi_61";
//const char *AP_PWD = "propasswifi";

//String validateCards = "";
//char Cards[] = {};

//void getValidateCards(){
//  
//  if (wifiMulti.run() == WL_CONNECTED) {
//    
//    HTTPClient http;   
//    http.begin("http://192.168.0.176:8000/get-validate-cards");
//
//    int httpResponseCode = http.GET();
//      
//    if (httpResponseCode>0) {
//      validateCards = http.getString();
//      Serial.println(validateCards);
//      Serial.println(validateCards.length());
//      for (int i = 0; i < validateCards.length(); i++) {
//          Cards[i] = validateCards[i];
//        }
//      Serial.println(Cards);
//     }
//      
//    http.end();
//  }
//}


void setup() {
  pinMode(23, OUTPUT);
  
  wifiMulti.addAP(AP_SSID, AP_PWD);
  delay(3000);
  
  Serial.begin(115200);
  
  wiegand.onReceive(receivedData, "_");
  wiegand.begin(Wiegand::LENGTH_ANY, true);
  
  pinMode(PIN_D0, INPUT);
  pinMode(PIN_D1, INPUT);
  attachInterrupt(digitalPinToInterrupt(PIN_D0), pinStateChanged, CHANGE);
  attachInterrupt(digitalPinToInterrupt(PIN_D1), pinStateChanged, CHANGE);
  
  pinStateChanged();
  delay(500);
//  getValidateCards();
}

void loop() {
  noInterrupts();
  wiegand.flush();
  interrupts();
  delay(100);
}

void pinStateChanged() {
  wiegand.setPin0State(digitalRead(PIN_D0));
  wiegand.setPin1State(digitalRead(PIN_D1));
}

void receivedData(uint8_t* data, uint8_t bits, const char* message) {
    unsigned t1 = micros();
    String CardID = "";
    
    uint8_t bytes = (bits+6)/8;
    for (int i=0; i<bytes; i++) {
        CardID += String(data[i], HEX);
    }
    CardID.toUpperCase();
    postDataToServer(CardID);
    unsigned t2 = micros();
    unsigned t3 = t2 - t1;
    Serial.print(t3 / 1000);
  
}


void postDataToServer(String Card) {  
  if (wifiMulti.run() == WL_CONNECTED) {
    HTTPClient http;   
     
//    http.begin("http://192.168.0.176:8000/validate-card");  
    http.begin("http://192.168.1.8:8000/validate-card");
    http.addHeader("Content-Type", "application/json");  
//    http.addHeader("Content-Type", "text/plain");       
     
    StaticJsonDocument<64> doc; // <200>
    doc["card"] = Card;
    
    String requestBody = "";
    serializeJson(doc, requestBody);
     
    int httpResponseCode = http.POST(requestBody);
    
    if(httpResponseCode>0){
      
      String response = http.getString();                       
      int comma = response.indexOf(',');
  
      String cmd = response.substring(0, comma);
      int opnTime = response.substring(comma+1, response.length()).toInt();

      String openOk = "open";
      
      if (cmd == openOk){
        digitalWrite(23, HIGH);
        delay(opnTime * 1000);
        digitalWrite(23, LOW);
    }
      else {digitalWrite(23, LOW);}


//      parseJson(response);
      

    }  
  }
}

//void parseJson(String input){
//  // String input;
//
//  StaticJsonDocument<64> doc; // <64>
//
//  DeserializationError error = deserializeJson(doc, input);
//
//  if (error) {
//    Serial.print("deserializeJson() failed: ");
//    Serial.println(error.c_str());
//    return;
//  }
//
//  const char* cmd = doc["cmd"]; // "open"
//  int openTime = doc["time"]; // 3
//
//  Serial.println(cmd);
//  Serial.println(openTime);
//  
//  const char* openBool = "open";
//      
//  if (cmd == openBool){
//    digitalWrite(23, HIGH);
//    delay(openTime * 1000);
//    digitalWrite(23, LOW);
//    }
//      else {digitalWrite(23, LOW);}
//}












  
