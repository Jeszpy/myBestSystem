#include <ArduinoJson.h>
#include <HTTPClient.h>
#include <WiFiMulti.h>
 
const char *AP_SSID = "WiFi_61";
const char *AP_PWD = "propasswifi";

const char *response = "";

WiFiMulti wifiMulti;

void setup() {
  pinMode(23, OUTPUT);
  
  Serial.begin(115200);
  
  wifiMulti.addAP(AP_SSID, AP_PWD);

  delay(4000);
 
}
 
void loop() {
  // Not used in this example
  postDataToServer();
  Serial.println("send...");
  delay(5000);
}
 
void postDataToServer() {  
  // Block until we are able to connect to the WiFi access point
  if (wifiMulti.run() == WL_CONNECTED) {
//    Serial.println("Posting JSON data to server...");
    HTTPClient http;   
     
    http.begin("http://192.168.0.176:8000/validate-card");  
    http.addHeader("Content-Type", "application/json");         
     
    StaticJsonDocument<200> doc;
    // Add values in the document
    //
    doc["card"] = "1a2s3d";
   
    // Add an array.
    //
//    JsonArray data = doc.createNestedArray("data");
//    data.add(48.756080);
//    data.add(2.302038);
     
    String requestBody;
    serializeJson(doc, requestBody);
     
    int httpResponseCode = http.POST(requestBody);
//    http.POST(requestBody);
    
    if(httpResponseCode>0){
       
      String response = http.getString();                       

      Serial.println(response);

      String open = "open";
      
      if (response == open){
        digitalWrite(23, HIGH);
        }
      else {digitalWrite(23, LOW);}
     
    }  
  }
}
