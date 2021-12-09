#include "EEPROM.h"
#include "WiFi.h"
#include "ESPAsyncWebServer.h"

const char* ssid = "ESP32";
const char* password =  "belprom1";

String newIP = "";

String eSsid = "";
String ePass = "";
String eIP = "";
String eGateway = "";
String eSubnet = "";

AsyncWebServer server(80);

void read_start_settings() {
  for (int i = 0; i < 30; ++i)
    {
       eSsid += char(EEPROM.read(i));
    }
  delay(10);
  for (int i = 30; i < 59; ++i)
    {
       ePass += char(EEPROM.read(i));
    }
  delay(10);
  for (int i = 60; i < 75; ++i)
    {
      eIP += char(EEPROM.read(i));
    }
  delay(10);
  for (int i = 76; i < 92; ++i)
    {
      eGateway += char(EEPROM.read(i));
    }
  delay(10);
  for (int i = 93; i < 109; ++i)
    {
      eSubnet += char(EEPROM.read(i));
    }
  delay(10);
}

void start_wifi(){
  IPAddress ip;
  IPAddress gateway;
  IPAddress subnet;

  if (ip.fromString(eIP) && subnet.fromString(eSubnet) && gateway.fromString(eGateway)) {
    if (WiFi.config(ip, gateway, subnet)){ // , primaryDNS, secondaryDNS
        WiFi.begin(eSsid, ePass);
      }
    else {
      IPAddress local_IP(192, 168, 1, 1);
      IPAddress gateway(192, 168, 1, 1);
      IPAddress subnet(255, 255, 255, 0);
    }
  }
}
 
void setup(){
  Serial.begin(115200);
  delay(30);
  EEPROM.begin(512);
  delay(30);

  read_start_settings()

  

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi..");
  }
 
  Serial.println(WiFi.localIP());
 
  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
    
    int paramsNr = request->params();
 
    for(int i=0;i<paramsNr;i++){
        AsyncWebParameter* p = request->getParam(i);
          newIP += p->value();
    }

    newIP += "F";

    for (int i = 0; i < newIP.length(); ++i) {
      EEPROM.write(i, newIP[i]);
    }

    EEPROM.commit();
    
    delay(10);

    newIP = "";
    eIP = "";
    
    for (int i = 0; i < 16; ++i) // delete
    {  // delete
        eIP += char(EEPROM.read(i)); // delete
    } // delete

    int idx = eIP.indexOf("F");
    eIP.remove(idx, eIP.length());

    IPAddress addr;
    IPAddress subnet(255, 255, 255, 0);
    IPAddress gateway(0, 0, 0, 0);
    
    if (addr.fromString(eIP)) {
      if (WiFi.config(addr, gateway, subnet)){ // , primaryDNS, secondaryDNS
          WiFi.begin(ssid, password);
        }
    }
    
    Serial.println(eIP); // delete
    request->send(200, "text/plain", eIP);    
    
  });

  
  server.begin();
  
}
 
void loop(){}
