
import Dashboard from './components/Dashboard';



function App() {
  return (
		<>
			<h1>Smart Greenhouse Dashboard</h1>
      <div className='buttons'>
        <button>Light</button>
        <button>Water Pump</button>
      </div>
			<Dashboard />
		</>
  )
}

export default App;
