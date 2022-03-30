#include <ESP8266WiFi.h>      // ESP 8266 와이파이 라이브러리
#include <ESP8266WebServer.h> // ESP 8266 웹서버 라이브러리

ESP8266WebServer server(80); // 웹서버 오브젝트

int led = D4; // LED 핀번호

void setup()
{
    // LED 핀 세팅
    pinMode(led, OUTPUT);
    digitalWrite(led, HIGH);

    // 시리얼 세팅
    Serial.begin(115200);
    Serial.println();

    // 와이파이 접속
    WiFi.begin("아이디", "비밀번호"); // 공유기 이름과 비밀번호

    Serial.print("Connecting");
    while (WiFi.status() != WL_CONNECTED) // 와이파이 접속하는 동안 "." 출력
    {
        delay(500);
        Serial.print(".");
    }
    Serial.println();

    Serial.print("Connected, IP address: ");
    Serial.println(WiFi.localIP()); // 접속된 와이파이 주소 출력

    // 루트에 접속 되었을때 실행할 함수 연결
    server.on("/moterOn", handleMoterOn);
    server.on("/moterOff", handleMoterOff);
    server.on("/lightOn", handleLightOn);
    server.on("/lightOff", handleLightOff);
    server.begin(); // 웹서버 시작
    Serial.println("HTTP server started");
}

void handleMoterOn()
{
    // digitalWrite(led, LOW);
    server.send(200, "text/html", "Moter ON");
    Serial.println("Moter On");
    delay(100);
}

void handleMoterOff()
{
    // digitalWrite(led, LOW);
    server.send(200, "text/html", "Moter OFF");
    Serial.println("Moter Off");
    delay(100);
}

void handleLightOn()
{
    // digitalWrite(led, Hight);
    server.send(200, "text/html", "Light ON");
    Serial.println("Light On");
    delay(100);
}

void handleLightOff()
{
    // digitalWrite(led, LOW);
    server.send(200, "text/html", "Light OFF");
    Serial.println("Light Off");
    delay(100);
}

// void handleRoot() { // 루트에 접속할때 실행할 내용
// digitalWrite(led, LOW);
// server.send(200, "text/plain", "hello from esp8266!");
// delay(100);
// digitalWrite(led, HIGH);
// }

void loop()
{
    server.handleClient();
}