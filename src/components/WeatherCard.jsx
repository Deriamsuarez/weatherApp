import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Loader from './Loader'


const WeatherCard = ({ setBg, lat, lon }) => {

    const [weather, setWeather] = useState()
    const [temp, setTemp] = useState(0)
    const [temptUnit, setTempUnit] = useState('°C')
    const [tempUnitInv, settempUnitInv] = useState('°F')
    const [loader, setLoader] = useState(true)
    let pressure = parseInt(weather?.main.pressure / 100);

    useEffect(() => {
        if (lat && lon) {
            const APIKey = 'b82164faf94d09fc9bdfb092942ef8fb'
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`
            axios.get(url)
                .then(res => {
                    setWeather(res.data)
                    setTemp(((res.data.main.temp) / 10).toFixed(1))
                    setLoader(false)
                })
                .catch(err => console.log(err))
        }

    }, [lat, lon])

    useEffect(() => {
        if (tempUnitInv === '°F') {
            settempUnitInv('°C')
        } else {
            settempUnitInv('°F')
        }
    }, [temptUnit])

    useEffect(() => {
        if(temp == 0) { setBg('') }

        if (temptUnit === '°C' && temp <= 25) {
            setBg('cold')
        }
        if (temptUnit === '°F' && temp <= 77) {
            setBg('cold')
        }
        if (temptUnit === '°C' && temp >= 25) {
            setBg('hot')
        }
        if (temptUnit === '°F' && temp >= 77) {
            setBg('hot')
        }
    }, [temp])

    function changeTemp() {
        if (temptUnit === '°C') {
            setTemp(((temp * 9 / 5) + 32).toFixed(1))
            setTempUnit('°F')
        }
        if (temptUnit != '°C') {
            setTempUnit('°C')
            setTemp(((temp - 32) * 5 / 9).toFixed(1))
        }
    }

    if (loader) {
        return <Loader />
    } else {
        return (
            <section className='weatherCardContainer'>
                <div className="headerWeather card glassEffect">
                    <h2>Weather App</h2>
                    <span>{weather?.name}, {weather?.sys.country} </span>
                </div>
                <div className="weatherCard card glassEffect">
                    <span className='temperatureSpan'><i className="fi fi-rr-thermometer-half"></i> <strong id='temp'>{`${temp}${temptUnit}`}</strong></span>
                    <ul>
                        <li><h3>{weather?.weather[0].description}</h3>
                            <span> <i className="fi fi-rr-dewpoint"></i><p>Weather description</p></span>
                        </li>
                        <li><h3 id="wind_Speed" >{weather?.wind.speed}</h3>
                            <span><i className="fi fi-rr-wind"></i><p>Wind speed</p></span>
                        </li>
                        <li><h3 id='clouds'>{weather?.clouds.all}</h3>
                            <span><i className="fi fi-rr-cloud-sun"></i><p>Clouds</p></span>
                        </li>
                        <li><h3 id='pressure'>{`${pressure}`}</h3>
                            <span><i className="fi fi-rr-tire-pressure-warning"></i><p>Pressure</p></span>
                        </li>
                    </ul>
                    <button className='glassEffect' onClick={changeTemp}><p>Convertir a</p> <strong>{tempUnitInv}</strong></button>
                </div>
            </section>
        )
    }

}
export default WeatherCard