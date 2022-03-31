/**
 * Created by K. Suwatchai (Mobizt)
 *
 * Email: k_suwatchai@hotmail.com
 *
 * Github: https://github.com/mobizt/Firebase-ESP8266
 *
 * Copyright (c) 2022 mobizt
 *
 */

#if defined(ESP32)
#include <WiFi.h>
#include <FirebaseESP32.h>
#elif defined(ESP8266)
#include <ESP8266WiFi.h>
#include <FirebaseESP8266.h>
#endif

// Provide the token generation process info.
#include <addons/TokenHelper.h>

// Provide the RTDB payload printing info and other helper functions.
#include <addons/RTDBHelper.h>

/* 1. Define the WiFi credentials */
#define WIFI_SSID "U+NetCFCC"
#define WIFI_PASSWORD "D@FD696HF2"

// For the following credentials, see examples/Authentications/SignInAsUser/EmailPassword/EmailPassword.ino

/* 2. Define the API Key */
#define API_KEY "AIzaSyC18pEbkDOQIcomQ3NxHNxjp3295oqOmYg"

/* 3. Define the RTDB URL */
#define DATABASE_URL "https://sikggu-sikggu-default-rtdb.firebaseio.com" //<databaseName>.firebaseio.com or <databaseName>.<region>.firebasedatabase.app

/* 4. Define the user Email and password that alreadey registerd or added in your project */
#define USER_EMAIL "demo@gmail.com"
#define USER_PASSWORD "demo123!"

// Define Firebase Data object
FirebaseData fbdo;

FirebaseAuth auth;
FirebaseConfig config;

unsigned long sendDataPrevMillis = 0;

unsigned long count = 0;

int pump_R = D1; // 펌프 릴레이
int led_R = D2;  // LED 릴레이
int moist = A0;  // 토양습도

int dht = D3; // 온습도
DHT11 dht11(dht);

void setup()
{
    pinMode(pump_R, OUTPUT);
    pinMode(led_R, OUTPUT);
    pinMode(moist, INPUT);

    Serial.begin(115200);

    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    Serial.print("Connecting to Wi-Fi");
    while (WiFi.status() != WL_CONNECTED)
    {
        Serial.print(".");
        delay(300);
    }
    Serial.println();
    Serial.print("Connected with IP: ");
    Serial.println(WiFi.localIP());
    Serial.println();

    Serial.printf("Firebase Client v%s\n\n", FIREBASE_CLIENT_VERSION);

    /* Assign the api key (required) */
    config.api_key = API_KEY;
    auth.user.email = USER_EMAIL;
    auth.user.password = USER_PASSWORD;

    /* Assign the RTDB URL (required) */
    config.database_url = DATABASE_URL;

    /* Assign the callback function for the long running token generation task */
    config.token_status_callback = tokenStatusCallback; // see addons/TokenHelper.h

    Firebase.begin(&config, &auth);

    Firebase.reconnectWiFi(true);

    Firebase.setDoubleDigits(5);

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
    server.send(200, "text/html", "Moter ON");
    Serial.println("Moter On");
    digitalWrite(pump_R, HIGH);
    delay(100);
}

void handleMoterOff()
{
    server.send(200, "text/html", "Moter OFF");
    Serial.println("Moter Off");
    digitalWrite(pump_R, LOW);
    delay(100);
}

void handleLightOn()
{
    server.send(200, "text/html", "Light ON");
    Serial.println("Light On");
    digitalWrite(led_R, HIGH);
    delay(100);
}

void handleLightOff()
{
    server.send(200, "text/html", "Light OFF");
    Serial.println("Light Off");
    digitalWrite(led_R, LOW);
    delay(100);
}

void loop()
{
    int water = analogRead(A0);
    float temp, humi;
    // light;
    // nutri;

    if (Firebase.ready() && (millis() - sendDataPrevMillis > 15000 || sendDataPrevMillis == 0))
    {
        sendDataPrevMillis = millis();

        if (water < 750)
        {
            Serial.printf("Set water... %s\n", Firebase.setString(fbdo, F("/info/water"), 'normal') ? "ok" : fbdo.errorReason().c_str());
            Serial.printf("Get water... %s\n", Firebase.setString(fbdo, FPSTR("/info/water")) ? fbdo.to<bool>() ? "true" : "false" : fbdo.errorReason().c_str());
        }
        else
        {
            Serial.printf("Set water... %s\n", Firebase.setString(fbdo, F("/info/water"), 'low') ? "ok" : fbdo.errorReason().c_str());
            Serial.printf("Get water... %s\n", Firebase.setString(fbdo, FPSTR("/info/water")) ? fbdo.to<bool>() ? "true" : "false" : fbdo.errorReason().c_str());
        }
        if ((err = dht11.read(humi, temp)) == 0)
        {
            Serial.printf("Set humi... %s\n", Firebase.setString(fbdo, F("/info/humi"), 'low') ? "ok" : fbdo.errorReason().c_str());
            Serial.printf("Get humi... %s\n", Firebase.setString(fbdo, FPSTR("/info/humi")) ? fbdo.to<bool>() ? "true" : "false" : fbdo.errorReason().c_str());
            Serial.printf("Set temp... %s\n", Firebase.setString(fbdo, F("/info/temp"), 'low') ? "ok" : fbdo.errorReason().c_str());
            Serial.printf("Get temp... %s\n", Firebase.setString(fbdo, FPSTR("/info/temp")) ? fbdo.to<bool>() ? "true" : "false" : fbdo.errorReason().c_str());
        }
        else
        {
            Serial.printf("Set humi... %s\n", Firebase.setString(fbdo, F("/info/humi"), 'normal') ? "ok" : fbdo.errorReason().c_str());
            Serial.printf("Get humi... %s\n", Firebase.getString(fbdo, FPSTR("/info/humi")) ? fbdo.to<bool>() ? "true" : "false" : fbdo.errorReason().c_str());
            Serial.printf("Set temp... %s\n", Firebase.setString(fbdo, F("/info/temp"), 'normal') ? "ok" : fbdo.errorReason().c_str());
            Serial.printf("Get temp... %s\n", Firebase.getString(fbdo, FPSTR("/info/temp")) ? fbdo.to<bool>() ? "true" : "false" : fbdo.errorReason().c_str());
        }

        // For the usage of FirebaseJson, see examples/FirebaseJson/BasicUsage/Create_Parse_Edit.ino
        FirebaseJson json;

        if (count == 0)
        {
            json.set("value/round/" + String(count), F("cool!"));
            json.set(F("vaue/ts/.sv"), F("timestamp"));
            Serial.printf("Set json... %s\n", Firebase.set(fbdo, F("/test/json"), json) ? "ok" : fbdo.errorReason().c_str());
        }
        else
        {
            json.add(String(count), "smart!");
            Serial.printf("Update node... %s\n", Firebase.updateNode(fbdo, F("/test/json/value/round"), json) ? "ok" : fbdo.errorReason().c_str());
        }

        Serial.println();
        server.handleClient();
        count++;
    }
}