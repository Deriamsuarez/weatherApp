import { useState, useEffect } from 'react'
import './App.css'
import WeatherCard from './components/WeatherCard'
import Footer from './components/Footer'

function App() {

  const [coords, setCoords] = useState()

  useEffect(() => {
    const success = pos => {
      const latlon = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }
      setCoords(latlon)
    }
    navigator.geolocation.getCurrentPosition(success)
  }, [])

  return (
    <div className="App">
      <WeatherCard
        lat={coords?.lat}
        lon={coords?.lon} />
      <Footer />
    </div>
  )
}

export default App
