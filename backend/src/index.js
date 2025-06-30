const express = require('express')
const http = require('http')
const initializeSocket = require('./socketHandler')
const initializeMqtt = require('./mqttHandler')
const path = require('path')

// --- Server Setup ---
const app = express()
const server = http.createServer(app)
const PORT = 5000

app.use(express.static(path.join(__dirname, '../frontend')))
app.get('/health', (req, res) => {
	res.json({ status: 'ok' })
}) // test endpoint

// Initialize WebSocket, MQTT
const { broadcast } = initializeSocket(server)
// initializeMqtt(broadcast)

// TESTING: Simulate MQTT data
setInterval(() => {
	const simulatedData = {
		temperature: Math.floor(Math.random() * 6) + 20, // between 20 and 25
		humidity: Math.random() * 30 + 50, // between 50 and 80
		timestamp: new Date().toISOString()
	}
	broadcast(simulatedData)
}, 1000)

server.listen(PORT, () => {
	console.log(`Backend server: http://localhost:${PORT}`)
})
