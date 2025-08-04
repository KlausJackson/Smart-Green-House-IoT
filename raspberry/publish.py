import time, board, adafruit_dht, config, json


def publish_data(client):
    dht = adafruit_dht.DHT11(board.D4)
          
    while True:
        try:
            temp = dht.temperature
            humid = dht.humidity
            
            if temp is None or humid is None:
                print("Failed to retrieve data from the sensor.")
            else:
                data = {
                    "temp": round(temp, 2),
                    "humid": humid,
                    "timestamp": int(time.time() * 1000) # millisecond
                    }
                payload = json.dumps(data)
                client.publish(config.DHT_DATA, payload, qos=0)
                
        except RuntimeError as e:
            print(e.args[0])
            
        time.sleep(3)

    
    