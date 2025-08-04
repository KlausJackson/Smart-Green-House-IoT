import useSocket from '../useSocket'
import DataChart from './DataChart'
import { configDashboard } from './dashboardConfig'

function Dashboard() {
	const { dataHistory, isConnected } = useSocket()

	function formatTime(timestamp) {
		const date = new Date(timestamp)
		return `${String(date.getHours()).padStart(2, '0')}:${String(
			date.getMinutes()
		).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`
	}

	// labels (timestamps) for x-axis
	const labels = dataHistory.map((d) => formatTime(d.timestamp))

	const {
		temperatureChartData,
		humidityChartData,
		tempOptions,
		humidityOptions
	} = configDashboard(labels, dataHistory)

	const lastTimestamp = dataHistory[dataHistory.length - 1]?.timestamp

	const renderStatus = () => {
		return isConnected ? (
			<span className='status-connected'>● Connected</span>
		) : (
			<span className='status-disconnected'>● Disconnected</span>
		)
	}

	return (
		<div className='dashboard-container'>
			<header className='dashboard-header'>{renderStatus()}</header>

			<div className='charts-grid'>
				<div className='chart-container'>
					<DataChart
						chartData={temperatureChartData}
						chartOptions={tempOptions}
					/>
				</div>
				<div className='chart-container'>
					<DataChart key={'humidityChart' + lastTimestamp}
						chartData={humidityChartData}
						chartOptions={humidityOptions}
					/>
				</div>
			</div>
		</div>
	)
}

export default Dashboard
