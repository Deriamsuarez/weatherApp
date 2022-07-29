import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'


const WeatherCard = ({ lat, lon }) => {

    const [weather, setWeather] = useState()
    const [temp, setTemp] = useState(0)
    const [temptUnit, setTempUnit] = useState('°C')
    const [temUnitInv, setTempUnitInv] = useState('°F')
    let pressure = parseInt(weather?.main.pressure / 100);


    useEffect(() => {
        if (lat & lon) {
            const APIKey = 'b82164faf94d09fc9bdfb092942ef8fb'
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`
            axios.get(url)
                .then(res => setWeather(res.data))
                .catch(err => console.log(err))
        }

        setTemp(parseInt(weather?.main?.temp / 10))

    }, [lat, lon])

    function changeTemp() {
        if(temptUnit === '°C'){
            setTemp(parseInt((temp * 9/5) + 32))
            setTempUnit('°F')
        }
        if(temptUnit != '°C'){
            setTempUnit('°C')
            setTemp(parseInt((temp - 32 ) * 5/9))
        }
    }

    useEffect(() => {
        if (temUnitInv === '°F') {
            setTempUnitInv('°C')
        }else{
            setTempUnitInv('°F')
        }
    }, [temptUnit])
    
    console.log(weather)
    return (
        <section className='weatherCardContainer'>
            <div className="headerWeather card">
                <h2>Weather App</h2>
                <span>{weather?.name}, {weather?.sys.country} </span>
            </div>
            <div className="weatherCard card">
                <span className='temperatureSpan'><i className="fi fi-rr-thermometer-half"></i> <strong id='temp'>{`${temp}${temptUnit}`}</strong></span>
                <ul>
                    <li><h3>{weather?.weather[0].description}</h3>
                        <span> <i className="fi fi-rr-dewpoint"></i><p>Weather description</p></span>
                    </li>
                    <li><h3 id="wind_Speed" >{weather?.wind.speed}</h3>
                        <span><i className="fi fi-rr-cloud-showers-heavy"></i><p>Wind speed</p></span>
                    </li>
                    <li><h3 id='clouds'>{weather?.clouds.all}</h3>
                        <span><i className="fi fi-rr-cloud-sun"></i><p>Clouds</p></span>
                    </li>
                    <li><h3 id='pressure'>{`${pressure}`}</h3>
                        <span><i className="fi fi-rr-tire-pressure-warning"></i><p>Pressure</p></span>
                    </li>
                </ul>
                <button onClick={changeTemp }><p>Convertir a</p> <strong>{temUnitInv}</strong></button>
            </div>
        </section>
    )

}
export default WeatherCard