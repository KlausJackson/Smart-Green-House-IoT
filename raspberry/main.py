import RPi.GPIO as GPIO
# import mqttHandler
import publish
import config


print("BEGIN")
GPIO.setmode(GPIO.BCM)
GPIO.setup(config.LED, GPIO.OUT)
GPIO.setup(config.ENA, GPIO.OUT)
GPIO.setup(config.IN1, GPIO.OUT)
GPIO.setup(config.IN2, GPIO.OUT)


import mqttHandler
client = mqttHandler.setup_client()


try:
    client.connect(config.MQTT_BROKER, config.MQTT_PORT, 60)
    client.loop_start()
    
    publish.publish_data(client)
    
except KeyboardInterrupt:
    print("STOP")
finally:
    print("CLEANUP")
    GPIO.cleanup()
    client.loop_stop()
    
    
    
    

