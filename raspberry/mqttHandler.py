import RPi.GPIO as GPIO
import paho.mqtt.client as mqtt
import config, time


fan_pwm = GPIO.PWM(config.ENA, 1000)
fan_pwm.start(0)


def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Connected to MQTT Broker")
        client.subscribe(config.LED_CONTROL)
        client.subscribe(config.FAN)
        print("Subscribed to all channels.")
    else:
        print("Failed. {rc}")
    
    
def on_message(client, userdata, msg):
    payload = msg.payload.decode()
    # print(payload)
    
    if msg.topic == config.LED_CONTROL:
        if payload == "ON":
            GPIO.output(config.LED, GPIO.HIGH)
        elif payload == "OFF":
            GPIO.output(config.LED, GPIO.LOW)
            
    elif msg.topic == config.FAN:
        if payload == "ON":
            GPIO.output(config.IN1, GPIO.HIGH)
            GPIO.output(config.IN2, GPIO.LOW)
            fan_pwm.ChangeDutyCycle(100) # 100%
        elif payload == "OFF":
            fan_pwm.ChangeDutyCycle(0)
            
            
def setup_client():
    client = mqtt.Client()
    client.username_pw_set(config.MQTT_USERNAME, config.MQTT_PASSWORD)
    client.tls_set()  
    client.on_connect = on_connect
    client.on_message = on_message
    return client
        
    
