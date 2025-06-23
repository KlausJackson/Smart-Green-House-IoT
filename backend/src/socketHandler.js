const WebSocket = require('ws')


function initializeSocket(server) {
	const wss = new WebSocket.Server({ server })
	let clients = new Set() // store connected clients

	wss.on('connection', (ws) => {
		clients.add(ws)
		console.log('Total clients:', clients.size)

		ws.on('message', (message) => {
            try {
                const data = JSON.parse(message)
                // when receive commands from frontend, send them to MQTT
            } catch (error) {
                console.error('Error:', error)
            }
		})

		ws.on('close', () => {
			clients.delete(ws)
			console.log('Total clients:', clients.size)
		})
	})

	// function used by MQTT handler to send data to the frontend
	function broadcast(data) {
		if (clients.size === 0) {
			return
		}
		const jsonData = JSON.stringify(data)
		clients.forEach((client) => {
			if (client.readyState === WebSocket.OPEN) {
				client.send(jsonData)
			}
		})
	}
	return { broadcast }
}

module.exports = initializeSocket
