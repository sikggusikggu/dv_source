/*
 * WebSocketServerAllFunctionsDemo.ino
 *
 *  Created on: 10.05.2018
 *
 */

#include <Arduino.h>

#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <WebSocketsServer.h>
#include <ESP8266WebServer.h>
#include <ESP8266mDNS.h>
#include <Hash.h>

#define USE_SERIAL Serial

ESP8266WiFiMulti WiFiMulti;
// 웹서버 기본 포트
ESP8266WebServer server(80);

// 웹서버와 클라이언트가 연결되는 포트
WebSocketsServer webSocket = WebSocketsServer(81);

// 클라이언트에서 서버쪽으로 값이 전송되었을 때 무엇을 할 지
void webSocketEvent(uint8_t num, WStype_t type, uint8_t *payload, size_t length)
{

  switch (type)
  {
  case WStype_DISCONNECTED:
    USE_SERIAL.printf("[%u] Disconnected!\n", num);
    break;
  case WStype_CONNECTED:
  {
    // num = 소켓번호(연결된 클라이언트 번호)
    IPAddress ip = webSocket.remoteIP(num);
    USE_SERIAL.printf("[%u] Connected from %d.%d.%d.%d url: %s\n", num, ip[0], ip[1], ip[2], ip[3], payload);

    // send message to client
    webSocket.sendTXT(num, "Connected");
    // 브로드ㅐㅋ스트
    // webSocket.broadcastTXT("내가전송할 말");
  }
  break;
  //메세지 수신부
  case WStype_TEXT:
    USE_SERIAL.printf("[%u] get Text: %s\n", num, payload);

    if (payload[0] == '#')
    {
      // 여기서 펌프 정보 받으면 될 듯.
      // // we get RGB data

      // // decode rgb data
      // uint32_t rgb = (uint32_t) strtol((const char *) &payload[1], NULL, 16);

      // analogWrite(LED_RED, ((rgb >> 16) & 0xFF));
      // analogWrite(LED_GREEN, ((rgb >> 8) & 0xFF));
      // analogWrite(LED_BLUE, ((rgb >> 0) & 0xFF));
    }

    break;
  }
}

void setup()
{
  // USE_SERIAL.begin(921600);
  USE_SERIAL.begin(115200);

  // USE_SERIAL.setDebugOutput(true);

  USE_SERIAL.println();
  USE_SERIAL.println();
  USE_SERIAL.println();

  for (uint8_t t = 4; t > 0; t--)
  {
    USE_SERIAL.printf("[SETUP] BOOT WAIT %d...\n", t);
    USE_SERIAL.flush();
    delay(1000);
  }

  // 공유가 IP 공유기 ID와 비밀번호 넣는 곳
  WiFiMulti.addAP("아이디", "패스워드");

  while (WiFiMulti.run() != WL_CONNECTED)
  {
    delay(100);
    USE_SERIAL.println("연결을 기다리고 있습니다. \n");
  }

  // IP 공유기로부터 할당받은 IP주소를 여기서 출력한다.
  USE_SERIAL.println("IP address: ");
  USE_SERIAL.println(WiFi.localIP());

  // start webSocket server
  webSocket.begin();
  webSocket.onEvent(webSocketEvent);

  // DNS설정 해주는건데 윈도우 10, 안드로이드에서는 안됨. 의미없음
  if (MDNS.begin("esp8266"))
  {
    USE_SERIAL.println("MDNS responder started");
  }

  // handle index
  // 웹 서버가 클라이언트한테 response해주는 부분!
  server.on("/", []()
            {
        // send index.html
        server.send(200, "text/html", "전송할내용"); });

  server.begin();

  // Add service to MDNS
  MDNS.addService("http", "tcp", 80);
  MDNS.addService("ws", "tcp", 81);
}

unsigned long last_10sec = 0;
unsigned int counter = 0;

void loop()
{
  unsigned long t = millis();
  webSocket.loop();
  server.handleClient();

  // delay쓰면 아두이노 전체가 멈춰서 쓰면 안됨.
  // 대신 millis를 받아서 해당 부분만 interval을 줌.
  if ((t - last_10sec) > 10 * 1000)
  {
    counter++;
    bool ping = (counter % 2);
    int i = webSocket.connectedClients(ping);
    USE_SERIAL.printf("%d Connected websocket clients ping: %d\n", i, ping);
    last_10sec = millis();

    String msg = "현재 사물인터넷보드의 시간=" + String(millis());
    // 브로드ㅐㅋ스트
    webSocket.broadcastTXT("msg");
  }
}