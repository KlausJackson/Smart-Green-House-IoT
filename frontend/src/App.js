import useSocket from './useSocket'
import Dashboard from './components/Dashboard'
import { useState } from 'react'
import { LED_CONTROL, FAN_CONTROL } from './config'


function App() {
	const { ledControl, fanControl } = useSocket()
	const [isLEDOn, setIsLEDOn] = useState(false)
	const [isFanOn, setIsFanOn] = useState(false)

	function toggleLight() {
		const message = isLEDOn ? 'OFF' : 'ON'
		ledControl(LED_CONTROL, message)
		setIsLEDOn(!isLEDOn)
	}

	function toggleFan() {
		const message = isFanOn ? 'OFF' : 'ON'
		fanControl(FAN_CONTROL, message)
		setIsFanOn(!isFanOn)
	}

	return (
		<>
			<h1>Smart House Dashboard</h1>
			<div className='buttons'>
				<button onClick={toggleLight}>
					{isLEDOn ? 'Turn Off' : 'Turn On'} Light
				</button>
				<button onClick={toggleFan}>
					{isFanOn ? 'Turn Off' : 'Turn On'} Fan
				</button>
			</div>
			<Dashboard />
		</>
	)
}

export default App
