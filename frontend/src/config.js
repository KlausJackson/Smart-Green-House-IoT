const key1 = process.env.REACT_APP_USERNAME
const key2 = process.env.REACT_APP_PASSWORD

console.log('Username:', key1)
console.log('Password:', key2)

export const WEBSOCKET_URL =
	'wss://55859251eec74ccb993220a3719620de.s1.eu.hivemq.cloud:8884/mqtt'

export const DH11_DATA = 'rasp/dht/data'
export const LED_CONTROL = 'rasp/led/control'
export const FAN_CONTROL = 'rasp/fan/control'

export const MAX_DATA_POINTS = 15

export const CONNECT_OPTIONS = {
	username: key1,
	password: key2,
	keepalive: 60,
	clean: true
}
