import useSocket from '../useSocket'
import DataChart from './DataChart'

function Dashboard() {
	const { dataHistory, isConnected } = useSocket()

    function formatTime(timestamp) {
        const date = new Date(timestamp)
        return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`
    }

	// labels (timestamps) for x-axis
	const labels = dataHistory.map((d) => formatTime(d.timestamp))

	const temperatureChartData = {
		labels,
		datasets: [
			{
				label: 'Temperature °C',
				data: dataHistory.map((d) => d.temperature),
				borderColor: 'rgb(255, 99, 132)',
				backgroundColor: 'rgba(255, 99, 132, 0.5)',
				tension: 0 // makes the line straight
			}
		]
	}

	const humidityChartData = {
		labels,
		datasets: [
			{
				label: 'Humidity %',
				data: dataHistory.map((d) => d.humidity),
				borderColor: 'rgb(53, 162, 235)',
				backgroundColor: 'rgba(53, 162, 235, 0.5)',
				tension: 0
			}
		]
	}

	const chartOptions = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top'
			},
			title: {
				display: true,
				font: { size: 18 }
			}
		},
		scales: {
			y: {
				beginAtZero: true
			}
		}
	}

	// Custom options
	const tempOptions = {
		...chartOptions,
		plugins: {
			...chartOptions.plugins,
			title: {
				...chartOptions.plugins.title,
				text:
					'Temperature: ' +
					(dataHistory[dataHistory.length - 1]?.temperature || 0) +
					'°C'
			}
		}
	}
	const humidityOptions = {
		...chartOptions,
		plugins: {
			...chartOptions.plugins,
			title: {
				...chartOptions.plugins.title,
				text:
					'Humidity: ' +
					(
						dataHistory[dataHistory.length - 1]?.humidity || 0
					).toFixed(2) +
					'%'
			}
		}
	}

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
					<DataChart
						chartData={humidityChartData}
						chartOptions={humidityOptions}
					/>
				</div>
			</div>
		</div>
	)
}

export default Dashboard
