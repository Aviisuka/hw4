import { useState, useEffect } from 'react'

function App() {
  const [temperature, setTemperature] = useState(null)

  useEffect(() => {
    // Fetch the current location and temperature
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        fetchWeather(latitude, longitude)
      },
      (error) => {
        console.error('Error getting location:', error)
      }
    )
  }, [])

  const fetchWeather = async (latitude, longitude) => {
    try {
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`)
      const data = await response.json()
      setTemperature(data.current_weather.temperature)
    } catch (error) {
      console.error('Error fetching weather:', error)
    }
  }

  return (
    <div>
      <h1>Weather App</h1>
      {temperature !== null ? (
        <p>Current Temperature: {temperature}°C</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default App