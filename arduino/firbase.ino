#if defined(ESP32)
#include <WiFi.h>
#include <FirebaseESP32.h>
#elif defined(ESP8266)
#include <ESP8266WiFi.h>
#include <FirebaseESP8266.h>
#endif

#include <addons/TokenHelper.h>
#include <addons/RTDBHelper.h>

#define WIFI_SSID "U+NetCFCC"
#define WIFI_PASSWORD "D@FD696HF2"
#define API_KEY "AIzaSyC18pEbkDOQIcomQ3NxHNxjp3295oqOmYg"
#define DATABASE_URL "https://sikggu-sikggu-default-rtdb.firebaseio.com"
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

    config.api_key = API_KEY;
    auth.user.email = USER_EMAIL;
    auth.user.password = USER_PASSWORD;
    config.database_url = DATABASE_URL;
    config.token_status_callback = tokenStatusCallback;
    Firebase.begin(&config, &auth);
    Firebase.reconnectWiFi(true);
    Firebase.setDoubleDigits(5);
}

void loop()
{
    int a = analogRead(A0);
    int water;

    if (a > 1000)
    {
        water = -1;
    }
    else if (a > 600)
    {
        water = 0;
    }
    else
    {
        water = 1;
    }

    sendDataPrevMillis = millis();

    Serial.printf("Set Temperature... %s\n", Firebase.setInt(fbdo, F("/info/water"), water) ? "ok" : fbdo.errorReason().c_str());
    Serial.printf("Get Temperature... %s\n", Firebase.getInt(fbdo, F("/info/water")) ? String(fbdo.to<float>()).c_str() : fbdo.errorReason().c_str());

    if (Firebase.getInt(fbdo, "/doit/moter/do"))
    {
        if (fbdo.dataTypeEnum() == fb_esp_rtdb_data_type_integer)
        {
            Serial.println(fbdo.to<int>());
            if (fbdo.to<int>() == 1)
            {
                digitalWrite(led_R, HIGH);
            }
            else
            {
                digitalWrite(led_R, LOW);
            }
        }
    }
    else
    {
        Serial.println(fbdo.errorReason());
    }

    if (Firebase.getInt(fbdo, "/doit/light/do"))
    {
        if (fbdo.dataTypeEnum() == fb_esp_rtdb_data_type_integer)
        {
            Serial.println(fbdo.to<int>());
            if (fbdo.to<int>() == 1)
            {
                digitalWrite(pump_R, HIGH);
            }
            else
            {
                digitalWrite(pump_R, LOW);
            }
        }
    }
    else
    {
        Serial.println(fbdo.errorReason());
    }

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
    count++;
}