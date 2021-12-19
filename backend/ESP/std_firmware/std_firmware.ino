#include "EEPROM.h"
#include "WiFi.h"
#include "ESPAsyncWebServer.h"
//#include ESP

String start = "start";
const char* stdSsid = "ESP32";
const char* stdPass =  "belprom1";

String newID = "";
String newSsid = "";
String newPass = "";
String newIP = "";
String newGateway = "";
String newSubnet = "";
String newServer = "";

String eID = "";
String eSsid = "";
String ePass = "";
String eIP = "";
String eGateway = "";
String eSubnet = "";
String eServer = "";

int idx;

AsyncWebServer server(80);

void read_start_settings() {
  for (int i = 0; i < 9; ++i) {
       eID += char(EEPROM.read(i));
    }
  delay(10);
  for (int i = 10; i < 39; ++i) {
       eSsid += char(EEPROM.read(i));
    }
  delay(10);
  for (int i = 40; i < 69; ++i) {
       ePass += char(EEPROM.read(i));
    }
  delay(10);
  for (int i = 70; i < 99; ++i) {
      eIP += char(EEPROM.read(i));
    }
  delay(10);
  for (int i = 100; i < 129; ++i) {
      eGateway += char(EEPROM.read(i));
    }
  delay(10);
  for (int i = 130; i < 159; ++i) {
      eSubnet += char(EEPROM.read(i));
    }
  delay(10);
  for (int i = 160; i < 189; ++i) {
      eServer += char(EEPROM.read(i));
    }
  delay(10);

  idx = eID.indexOf("?");
  eID.remove(idx, eID.length());
  idx = eSsid.indexOf("?");
  eSsid.remove(idx, eSsid.length());
  idx = ePass.indexOf("?");
  ePass.remove(idx, ePass.length());
  idx = eIP.indexOf("?");
  eIP.remove(idx, eIP.length());
  idx = eGateway.indexOf("?");
  eGateway.remove(idx, eGateway.length());
  idx = eSubnet.indexOf("?");
  eSubnet.remove(idx, eSubnet.length());
  idx = eServer.indexOf("?");
  eServer.remove(idx, eServer.length());

  delay(50);
}

void write_start_settings() {

  for (int i = 0; i < newID.length(); ++i) {
    EEPROM.write(0 + i, newID[i]);
  }
  delay(10);
  
  for (int i = 0; i < newSsid.length(); ++i) {
    EEPROM.write(10 + i, newSsid[i]);
  }
  delay(10);
  
  for (int i = 0; i < newPass.length(); ++i) {
    EEPROM.write(40 + i, newPass[i]);
  }
  delay(10);
  
  for (int i = 0; i < newIP.length(); ++i) {
    EEPROM.write(70 + i, newIP[i]);
  }
  delay(10);
  
  for (int i = 0; i < newGateway.length(); ++i) {
    EEPROM.write(100 + i, newGateway[i]);
  }
  delay(10);
  
  for (int i = 0; i < newSubnet.length(); ++i) {
    EEPROM.write(130 + i, newSubnet[i]);
  }
  delay(10);
  
  for (int i = 0; i < newServer.length(); ++i) {
    EEPROM.write(160 + i, newServer[i]);
  }
  delay(10);

  
  EEPROM.commit();
  delay(500);

  newID = "";
  newSsid = "";
  newPass = "";
  newIP = "";
  newGateway = "";
  newSubnet = "";
  newServer = "";

  ESP.restart();
  
}

void start_wifi(){
  IPAddress ip;
  IPAddress gateway;
  IPAddress subnet;
  
  if (WiFi.config(ip.fromString(eIP), gateway.fromString(eGateway), subnet.fromString(eSubnet))) {
    Serial.print("попал в старт");
    WiFi.begin(eSsid.c_str(), ePass.c_str());
    delay(3000);
    if (WiFi.status() == WL_CONNECTED) {
      Serial.println("Connecting to WiFi from EEPROM");
      Serial.print("Local IP: ");
      Serial.println(WiFi.localIP());
      WiFi.config(ip, gateway, subnet);
      delay(3000);
      Serial.print("Сменил адрес");
      Serial.print("Local IP: ");
      Serial.println(WiFi.localIP());
    }
  } 
  else {
    IPAddress ap_IP(192, 168, 1, 1);
    IPAddress ap_gateway(0, 0, 0, 0);
    IPAddress ap_subnet(255, 255, 255, 0);  
      
    WiFi.mode(WIFI_AP);
    WiFi.softAP(stdSsid, stdPass);
    delay(3000);
    WiFi.softAPConfig(ap_IP, ap_gateway, ap_subnet);

    IPAddress IP = WiFi.softAPIP();
    Serial.print("AP started at IP: ");
    Serial.println(IP);
  }
  
  delay(50);
}


void get_settings(){
  server.on("/set-settings/", HTTP_GET, [](AsyncWebServerRequest *request){

//    можно оставить только hasParam ("id")

    if (request->hasParam("id") && request->hasParam("ssid") &&    
                                   request->hasParam("pass") && 
                                   request->hasParam("ip") && 
                                   request->hasParam("gateway") && 
                                   request->hasParam("subnet") && 
                                   request->hasParam("server")) {

      newID = request->getParam("id")->value();
      newSsid = request->getParam("ssid")->value();
      newPass = request->getParam("pass")->value();
      newIP = request->getParam("ip")->value();
      newGateway = request->getParam("gateway")->value();
      newSubnet = request->getParam("subnet")->value();
      newServer = request->getParam("server")->value();

      newID += "?";
      newSsid += "?";
      newPass += "?";
      newIP += "?";
      newGateway += "?";
      newSubnet += "?";
      newServer += "?";
      
     }     

     Serial.println(newID);
     Serial.println(newSsid);
     Serial.println(newPass);
     Serial.println(newIP);
     Serial.println(newGateway);
     Serial.println(newSubnet);
     Serial.println(newServer);     

     request->send(200, "text/plain", "OK");    

     write_start_settings();
     
   });
  }

  
void setup(){
  delay(1000);
  Serial.begin(115200);
  delay(30);
  EEPROM.begin(512);
  delay(30);

  Serial.println("read eeprom");
  read_start_settings();

  Serial.println(eSsid);
  Serial.println(ePass);
  Serial.println(eIP);
  Serial.println(eGateway);
  Serial.println(eSubnet);
  Serial.println(eServer);
  
  Serial.println("Connecting to WiFi..");
  start_wifi();

  get_settings();
  
  server.begin();
  
}
 
void loop(){}

//     int paramsNr = request->params();
// 
//     for(int i=0;i<paramsNr;i++){
//         AsyncWebParameter* p = request->getParam(i);
//           newSsid += p->value();
//           newPass += p->value();
//           newIP += p->value();
//           newGateway += p->value();
//           newSubnet += p->value();
//     }
     
//newSsid += p->value();
//           newPass += p->value();
//           newIP += p->value();
//           newGateway += p->value();
//           newSubnet += p->value();


//     for (int i = 0; i < newIP.length(); ++i) {
//       EEPROM.write(i, newIP[i]);
//     }
//
//     EEPROM.commit();
//    
//     delay(10);
//
//     newIP = "";
//     eIP = "";
//    
//     for (int i = 0; i < 16; ++i) // delete
//     {  // delete
//         eIP += char(EEPROM.read(i)); // delete
//     } // delete
//
//     int idx = eIP.indexOf("F");
//     eIP.remove(idx, eIP.length());
//    
//     Serial.println(eIP); // delete
