import { useState, useEffect } from 'react'

const WEBSOCKET_URL = 'ws://localhost:5000'
const MAX_DATA_POINTS = 30 // The maximum number of data points to show

function useSocket() {
	const [dataHistory, setDataHistory] = useState([])
	const [isConnected, setIsConnected] = useState(false)

	useEffect(() => {
		const ws = new WebSocket(WEBSOCKET_URL)

		ws.onopen = () => {
			setIsConnected(true)
		}

		ws.onmessage = (event) => {
			try {
				const newDataPoint = JSON.parse(event.data)

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
				console.error('Error parsing WebSocket message:', error)
			}
		}

		ws.onclose = () => {
			setIsConnected(false)
		}

		ws.onerror = (error) => {
			console.error('WebSocket error:', error)
			setIsConnected(false)
		}

		return () => {
			ws.close()
		}
	}, [])

	return { dataHistory, isConnected }
}

export default useSocket
