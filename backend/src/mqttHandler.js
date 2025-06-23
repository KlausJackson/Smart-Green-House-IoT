const mqtt = require('mqtt')


function subscribeToMqtt(client, topic) {
    client.subscribe(topic, (err) => {
        if (err) {
            console.error(`Failed (${topic}):`, err)
        }
    })
}


function initializeMqtt(broadcast) {
	const RASPBERRY_PI_IP = 'mqtt://192.168.1.105'
	const SENSOR = 'greenhouse/sensors/data'
    const CONTROL_LIGHTS = 'greenhouse/control/lights'
    const CONTROL_PUMP = 'greenhouse/control/pump'

	const client = mqtt.connect(RASPBERRY_PI_IP)

	client.on('connect', () => {
		subscribeToMqtt(client, SENSOR)
        subscribeToMqtt(client, CONTROL_LIGHTS)
        subscribeToMqtt(client, CONTROL_PUMP)
	})

	client.on('message', (topic, message) => {
		if (topic === SENSOR) {
			const sensorData = JSON.parse(message.toString())
			broadcast(sensorData) // send data to frontend
		}
	})
}

module.exports = initializeMqtt
