
export function configDashboard(labels, dataHistory) {
    const temperatureChartData = {
        labels,
        datasets: [
            {
                label: 'Temperature °C',
                data: dataHistory.map((d) => d.temp),
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
                data: dataHistory.map((d) => d.humid),
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

    const tempOptions = {
        ...chartOptions,
        plugins: {
            ...chartOptions.plugins,
            // title: {
            //     ...chartOptions.plugins.title,
            //     text:
            //         'Temperature: ' +
            //         (dataHistory[dataHistory.length - 1]?.temperature || 0).toFixed(
            //             2
            //         ) +
            //         '°C'
            // }
        }
    }
    const humidityOptions = {
        ...chartOptions,
        plugins: {
            ...chartOptions.plugins,
            // title: {
            //     ...chartOptions.plugins.title,
            //     text:
            //         'Humidity: ' +
            //         (dataHistory[dataHistory.length - 1]?.humidity || 0).toFixed(
            //             2
            //         ) +
            //         '%'
            // }
        }
    }
    return {
        temperatureChartData,
        humidityChartData,
        tempOptions,
        humidityOptions
    }
}