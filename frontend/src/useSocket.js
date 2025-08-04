import { useState, useEffect, useRef } from 'react'
import mqtt from 'mqtt'
import { WEBSOCKET_URL, DH11_DATA, CONNECT_OPTIONS, MAX_DATA_POINTS } from './config'

function useSocket() {
	const [dataHistory, setDataHistory] = useState([])
	const [isConnected, setIsConnected] = useState(false)
	const clientRef = useRef(null)

	useEffect(() => {
		if (clientRef.current) return; // Prevent multiple connections
		clientRef.current = mqtt.connect(WEBSOCKET_URL, CONNECT_OPTIONS)
		const client = clientRef.current;

		client.on('connect', () => {
			setIsConnected(true)
			client.subscribe(DH11_DATA, { qos: 0 }, (e) => {
				if (e) {
					// console.error('error:', e)
				}
			})
		})

		client.on('message', (topic, message) => {
			if (topic === DH11_DATA) {
				try {
					const newDataPoint = JSON.parse(message.toString())
				// add new data point
				setDataHistory((currentHistory) => {
					const updatedHistory = [...currentHistory, newDataPoint]

					// remove the oldest data point from the beginning
					if (updatedHistory.length > MAX_DATA_POINTS) {
						return updatedHistory.slice(1)
					}
					return updatedHistory
				})
				} catch (error) {
					console.error('Error:', error)
				}
			}
		})

		client.on('close', () => {
			setIsConnected(false)
		})

		client.on('error', (error) => {
			console.error('MQTT error:', error)
			setIsConnected(false)
			client.end()
		})

		return () => {
			if (client) {
				client.end()
			}
		}
	}, [])

	function ledControl(topic, payload) {
		if (clientRef.current && clientRef.current.connected) {
			clientRef.current.publish(topic, payload, { qos: 0 }, (e) => {
				if (e) {
					// console.error('error:', e)
				}
			})
		}
	}

	function fanControl(topic, payload) {
		if (clientRef.current && clientRef.current.connected) {
			clientRef.current.publish(topic, payload, { qos: 0 }, (e) => {
				if (e) {
					// console.error('error:', e)
				}
				console.log(`Fan control message sent: ${payload}`)
			})
		}
	}

	return { dataHistory, isConnected, ledControl, fanControl }
}

export default useSocket
