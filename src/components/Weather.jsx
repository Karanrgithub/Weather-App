import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/sunny-icon-17.png'
import cloud_icon from '../assets/dhagsunny.jpeg'
import drizzle_icon from '../assets/cloude-rain-sun.jpeg'
import best_icon from '../assets/night-cloude.jpeg'
import snow_icon from '../assets/cloudyrain.webp'
import night_icon from '../assets/nighticon.png'
import cloude_icon from '../assets/only-cloud.jpg'
import wind_icon from '../assets/wind.png'
import load_icon from '../assets/best-night.jpeg'
import humidity_icon from '../assets/humidity.jpg'



const Weather = () => {

    const inputRef = useRef()

    const [weatherData, setWeatherData] = useState(false);

    const allIcons = {
        "01d": night_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": load_icon,
        "03d": cloude_icon,
        "03n": cloude_icon,
        "04d": best_icon,
        "04n": best_icon,
        "09d": snow_icon,
        "09n": snow_icon,
        "10d": drizzle_icon,
        "10n": snow_icon,
        "13d": night_icon,
        "13n": night_icon,
        // https:`//openweathermap.org/img/wn/01d@2x.png`,
        // https:`//openweathermap.org/img/wn/01n@2x.png`,
        // https:`//openweathermap.org/img/wn/02d@2x.png`,
        // https:`//openweathermap.org/img/wn/02n@2x.png`,
        // https:`//openweathermap.org/img/wn/03d@2x.png`,
        // https:`//openweathermap.org/img/wn/03n@2x.png`,
        // https:`//openweathermap.org/img/wn/04d@2x.png`,
        // https:`//openweathermap.org/img/wn/04n@2x.png`,
        // https:`//openweathermap.org/img/wn/09d@2x.png`,
        // https:`//openweathermap.org/img/wn/09n@2x.png`,
        // https:`//openweathermap.org/img/wn/10d@2x.png`,
        // https:`//openweathermap.org/img/wn/10n@2x.png`,
        // https:`//openweathermap.org/img/wn/13d@2x.png`,
        // https:`//openweathermap.org/img/wn/13n@2x.png`,
        

    }

    const search = async (city) => {

        if (city === " ") {
            alert("enter city name");
            return
        }

    

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
        const response = await fetch(url);
        const data = await response.json();


        console.log(data);


        const icon = allIcons[data.weather[0].icon] || clear_icon



        setWeatherData({
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            tempreture: Math.floor(data.main.temp),
            location: data.name,
            icon: icon
        })

   
    } catch (error) {
    //  setWeatherData(false);
    //  console.error("Error in fetching weather data")
    }
}

    useEffect(() => {
        search("")
    },)



    return (
        <div className='weather'>
            <div className="search-bar">
                <input ref={inputRef} type="text" placeholder='search' />
                <img src={search_icon} alt="" onClick={() => search(inputRef.current.value)} />
            </div>

            {weatherData?<>
                <img src={weatherData.icon} alt="" className='weather-icon' />
            <p className='tempreture'>{weatherData.tempreture}c</p>
            <p className='location'>{weatherData.location}</p>


            <div className="weather-data">
                <div className="col">
                    <img src={humidity_icon} alt="" className='humi-img' />
                    <div>
                        <p>{weatherData.humidity}</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className="col">
                    <img src={wind_icon} alt="" className='wind-img' />
                    <div>
                        <p>{weatherData.windSpeed}km/hr</p>
                        <span>Wind speed</span>
                    </div>
                </div>
            </div>
            </>:<></>}

           
        </div>
    )
}

export default Weather