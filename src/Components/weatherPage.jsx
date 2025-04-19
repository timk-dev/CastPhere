import styles from '../Components/style.module.css';

import wind from 'src/assets/wind.svg';
import drop from 'src/assets/drop.svg';
import thermo from 'src/assets/thermo.svg';
import latitu from 'src/assets/latitude.svg';
import longitu from 'src/assets/longitude.svg';
import riseimg from 'src/assets/sunrise.svg';
import setimg from 'src/assets/sunset.svg';

import React, { useState, useEffect } from "react";

import { DateTime } from "luxon";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

const WeatherPage = ({transferData, setParentState}) => {
    const [value, setValue] = useState('');
    const [yourCityWeatherData, setYourCityWeatherData] = useState('');
    const [yourCityBulkData, setYourCityBulkData] = useState('');
    const [isHourly, setIsHourly] = useState(false);

    //console.log(transferData)
    const getWeatherApi = async () => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${transferData[0]},${transferData[1]},us&units=imperial&appid=${ import.meta.env.VITE_APP_ID }`
            
            const response = await fetch(url);
            const data = await response.json();
            if (response.staus !== 200) {
                setYourCityWeatherData(data);
                //console.log(data);
            } else {
                console.log('Server Error', data.error.message);
            }
        } catch (error) {
            console.log(error.name)
        }
    }

    const getBulkWeather = async () => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/forecast?q=${transferData[0]},${transferData[1]},us&units=imperial&appid=${ import.meta.env.VITE_APP_ID }`
            
            const response = await fetch(url);
            const data = await response.json();
            if (response.staus !== 200) {
                setYourCityBulkData(data);
                console.log(data, "bulk");
            } else {
                console.log('Server Error', data.error.message);
            }
        } catch (error) {
            console.log(error.name)
        }
    }

    const handleHourlyClick = event => {
        // 👇️ toggle shown state
        setIsHourly(current => !current);
    
        // 👇️ or simply set it to true
        // setIsShown(true);
    };

    useEffect(() => {
        getWeatherApi();
        getBulkWeather();
    }, [])

    const date  = Date();
    function convert(input) {
        return DateTime.fromFormat(input, 'HH:mm').toFormat('h:mm a');
    }
    function convertData(date) {
        return DateTime.fromISO(date).toFormat('cccc');
    }

    //console.log("data:", yourCityWeatherData);

    const temp = Math.round(yourCityWeatherData && yourCityWeatherData.main.temp);
    const windSpeed = Math.round(yourCityWeatherData && yourCityWeatherData.wind.speed);

    //console.log(convertData(), "convert")

    const unixtime = new Date(yourCityWeatherData && yourCityWeatherData.sys.sunrise * 1e3); // 1e3 === 1000
    const sunrise = unixtime.toLocaleTimeString();

    const unixtime2 = new Date(yourCityWeatherData && yourCityWeatherData.sys.sunset * 1e3); // 1e3 === 1000
    const sunset = unixtime2.toLocaleTimeString();

    const chartData = {
        labels: [yourCityBulkData && convertData(`${yourCityBulkData.list[0].dt_txt}`.slice(0, 10)), yourCityBulkData && convertData(`${yourCityBulkData.list[1].dt_txt}`.slice(0, 10)), yourCityBulkData && convertData(`${yourCityBulkData.list[9].dt_txt}`.slice(0, 10)),
                yourCityBulkData && convertData(`${yourCityBulkData.list[17].dt_txt}`.slice(0, 10)), yourCityBulkData && convertData(`${yourCityBulkData.list[25].dt_txt}`.slice(0, 10))
        ],
        datasets: [
          {
            label: "Max Temp (°F)",
            data: [Math.round(yourCityBulkData && yourCityBulkData.list[0].main.temp_max), Math.round(yourCityBulkData && yourCityBulkData.list[0].main.temp_max), Math.round(yourCityBulkData && yourCityBulkData.list[9].main.temp_max),
                    Math.round(yourCityBulkData && yourCityBulkData.list[17].main.temp_max), Math.round(yourCityBulkData && yourCityBulkData.list[25].main.temp_max)
            ],
            fill: false,
            backgroundColor: "#f3a469",
            borderColor: "#00000065",
            color: "#fff",
          },
        ],
      };
      
    return(
        <main className={styles.weather}>
            <section className={styles.content}>
                <div className={styles.weatherData}>
                    <div className={styles.cityHolder}>
                        <svg onClick={()=>setParentState('element1')} className={styles.svg} width="1.5em" height="1.5em" viewBox="0 0 35 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.888 27.024L0.448 13.584L13.888 0.143998V7.488H34.672V19.68H13.888V27.024ZM12.448 23.52V18.24H33.232V8.928H12.448V3.648L2.512 13.584L12.448 23.52Z" fill="white"/>
                        </svg>

                        <span>{convert(`${date}`.slice(16, 21))}</span>
                        <h1>{yourCityWeatherData && yourCityWeatherData.name}</h1>
                        <p><span>Today</span> {`${date}`.slice(4, 7)}. {`${date}`.slice(8, 10)}, {`${date}`.slice(13, 16)}</p>
                    </div>
                    
                    <div className={styles.tempHolder}>
                        <h1>{yourCityWeatherData && temp}°<span>F</span></h1>
                        <img rel='preload preconnect' loading='lazy' src={`http://openweathermap.org/img/w/${yourCityWeatherData && yourCityWeatherData.weather[0].icon}.png`} width='20px' height='20px' alt='Weather Icon'>
                        </img>
                    </div>

                    <section className={styles.dataHolder}>
                        <p>
                            <img rel='preload preconnect' loading='lazy' src={drop} width='12px' height='12px' alt='Drop Icon'>
                            </img> <span>Humidity:</span> {yourCityWeatherData && yourCityWeatherData.main.humidity}%
                        </p>
                        <p>
                            <img rel='preload preconnect' loading='lazy' src={thermo} width='12px' height='12px' alt='Thermometer Icon'>
                            </img> <span>Feels like:</span> {yourCityWeatherData && yourCityWeatherData.main.feels_like}°<span>F</span>
                        </p>
                        <p>
                            <img rel='preload preconnect' loading='lazy' src={wind} width='12px' height='12px' alt='Wind Icon'>
                            </img> <span>Wind speed:</span> {yourCityWeatherData && windSpeed} mph
                        </p>
                        
                        <div>
                            <span>Weather Forecast</span>
                            <h1>{yourCityWeatherData && yourCityWeatherData.weather[0].description}</h1>
                        </div>
                    </section>

                    <div className={styles.changeForecast}>
                        <p>Hourly</p>
                        <p>Daily</p>
                    </div>

                    <section className={styles.fiveDayFore}>
                        {isHourly ?
                            <div className={styles.changeForecast}>
                                <p className={styles.active}>Hourly</p>
                                <p onClick={handleHourlyClick}>Daily</p>
                            </div>
                        :
                            <div className={styles.changeForecast}>
                                <p onClick={handleHourlyClick}>Hourly</p>
                                <p className={styles.active}>Daily</p>
                            </div>
                        }

                        {isHourly ?
                            <>
                                <div className={styles.forecastBox}>
                                    <span>{yourCityBulkData && convert(`${yourCityBulkData.list[1].dt_txt}`.slice(11, 16))}</span>
                                    
                                    <h1>{yourCityBulkData && `${yourCityBulkData.list[1].main.temp}`.slice(0, 2)}°<span>F</span></h1>

                                    <span className={styles.descCont}>
                                        <img rel='preload preconnect' loading='lazy' src={`http://openweathermap.org/img/w/${yourCityBulkData && yourCityBulkData.list[1].weather[0].icon}.png`} width='15px' height='15px' alt='Thermometer Icon'>
                                        </img>
                                        {yourCityBulkData && yourCityBulkData.list[1].weather[0].main}
                                    </span>
                                </div>

                                <div className={styles.forecastBox}>
                                    <span>{yourCityBulkData && convert(`${yourCityBulkData.list[3].dt_txt}`.slice(11, 16))}</span>
                                    
                                    <h1>{yourCityBulkData && `${yourCityBulkData.list[3].main.temp}`.slice(0, 2)}°<span>F</span></h1>

                                    <span className={styles.descCont}>
                                        <img rel='preload preconnect' loading='lazy' src={`http://openweathermap.org/img/w/${yourCityBulkData && yourCityBulkData.list[3].weather[0].icon}.png`} width='15px' height='15px' alt='Thermometer Icon'>
                                        </img>
                                        {yourCityBulkData && yourCityBulkData.list[3].weather[0].main}
                                    </span>
                                </div>

                                <div className={styles.forecastBox}>
                                    <span>{yourCityBulkData && convert(`${yourCityBulkData.list[4].dt_txt}`.slice(11, 16))}</span>
                                   
                                    <h1>{yourCityBulkData && `${yourCityBulkData.list[4].main.temp}`.slice(0, 2)}°<span>F</span></h1>

                                    <span className={styles.descCont}>
                                        <img rel='preload preconnect' loading='lazy' src={`http://openweathermap.org/img/w/${yourCityBulkData && yourCityBulkData.list[4].weather[0].icon}.png`} width='15px' height='15px' alt='Thermometer Icon'>
                                        </img>
                                        {yourCityBulkData && yourCityBulkData.list[4].weather[0].main}
                                    </span>
                                </div>

                                <div className={styles.forecastBox}>
                                    <span>{yourCityBulkData && convert(`${yourCityBulkData.list[5].dt_txt}`.slice(11, 16))}</span>
                                    
                                    <h1>{yourCityBulkData && `${yourCityBulkData.list[5].main.temp}`.slice(0, 2)}°<span>F</span></h1>

                                    <span className={styles.descCont}>
                                        <img rel='preload preconnect' loading='lazy' src={`http://openweathermap.org/img/w/${yourCityBulkData && yourCityBulkData.list[5].weather[0].icon}.png`} width='15px' height='15px' alt='Thermometer Icon'>
                                        </img>
                                        {yourCityBulkData && yourCityBulkData.list[5].weather[0].main}
                                    </span>
                                </div>

                                <div className={styles.forecastBox}>
                                    <span>{yourCityBulkData && convert(`${yourCityBulkData.list[7].dt_txt}`.slice(11, 16))}</span>
                                    
                                    <h1>{yourCityBulkData && `${yourCityBulkData.list[7].main.temp}`.slice(0, 2)}°<span>F</span></h1>

                                    <span className={styles.descCont}>
                                        <img rel='preload preconnect' loading='lazy' src={`http://openweathermap.org/img/w/${yourCityBulkData && yourCityBulkData.list[7].weather[0].icon}.png`} width='15px' height='15px' alt='Thermometer Icon'>
                                        </img>
                                        {yourCityBulkData && yourCityBulkData.list[7].weather[0].main}
                                    </span>
                                </div>
                            </>
                        :
                            <>
                            <div className={styles.forecastBox}>
                                <span>Today</span>

                                <div>
                                    <span className={styles.minmax}>High: {Math.round(yourCityWeatherData && yourCityWeatherData.main.temp_max)}°</span>
                                    <span className={styles.minmax}>Low: {Math.round(yourCityWeatherData && yourCityWeatherData.main.temp_min)}°</span>
                                </div>
                                <h1>{yourCityBulkData && `${yourCityBulkData.list[0].main.temp}`.slice(0, 2)}°<span>F</span></h1>
                                
                                <span className={styles.descCont}>
                                    <img rel='preload preconnect' loading='lazy' src={`http://openweathermap.org/img/w/${yourCityBulkData && yourCityBulkData.list[0].weather[0].icon}.png`} width='15px' height='15px' alt='Weather Icon'>
                                    </img>
                                    {yourCityBulkData && yourCityBulkData.list[0].weather[0].main}
                                </span>
                            </div>

                            <div className={styles.forecastBox}>
                                <span>Tomorrow</span>

                                <div>
                                    <span className={styles.minmax}>High: {Math.round(yourCityBulkData && yourCityBulkData.list[1].main.temp_max)}°</span>
                                    <span className={styles.minmax}>Low: {Math.round(yourCityBulkData && yourCityBulkData.list[1].main.temp_min)}°</span>
                                </div>
                                <h1>{yourCityBulkData && `${yourCityBulkData.list[1].main.temp}`.slice(0, 2)}°<span>F</span></h1>

                                <span className={styles.descCont}>
                                    <img rel='preload preconnect' loading='lazy' src={`http://openweathermap.org/img/w/${yourCityBulkData && yourCityBulkData.list[1].weather[0].icon}.png`} width='15px' height='15px' alt='Weather Icon'>
                                    </img>
                                    {yourCityBulkData && yourCityBulkData.list[1].weather[0].main}
                                </span>
                            </div>

                            <div className={styles.forecastBox}>
                                <span>{yourCityBulkData && convertData(`${yourCityBulkData.list[9].dt_txt}`.slice(0, 10))}</span>
                                
                                <div>
                                    <span className={styles.minmax}>High: {Math.round(yourCityBulkData && yourCityBulkData.list[9].main.temp_max)}°</span>
                                    <span className={styles.minmax}>Low: {Math.round(yourCityBulkData && yourCityBulkData.list[9].main.temp_min)}°</span>
                                </div>
                                <h1>{yourCityBulkData && `${yourCityBulkData.list[9].main.temp}`.slice(0, 2)}°<span>F</span></h1>

                                <span className={styles.descCont}>
                                    <img rel='preload preconnect' loading='lazy' src={`http://openweathermap.org/img/w/${yourCityBulkData && yourCityBulkData.list[9].weather[0].icon}.png`} width='15px' height='15px' alt='Weather Icon'>
                                    </img>
                                    {yourCityBulkData && yourCityBulkData.list[9].weather[0].main}
                                </span>
                            </div>

                            <div className={styles.forecastBox}>
                                <span>{yourCityBulkData && convertData(`${yourCityBulkData.list[17].dt_txt}`.slice(0, 10))}</span>
                                
                                <div>
                                    <span className={styles.minmax}>High: {Math.round(yourCityBulkData && yourCityBulkData.list[17].main.temp_max)}°</span>
                                    <span className={styles.minmax}>Low: {Math.round(yourCityBulkData && yourCityBulkData.list[17].main.temp_min)}°</span>
                                </div>
                                <h1>{yourCityBulkData && `${yourCityBulkData.list[17].main.temp}`.slice(0, 2)}°<span>F</span></h1>

                                <span className={styles.descCont}>
                                    <img rel='preload preconnect' loading='lazy' src={`http://openweathermap.org/img/w/${yourCityBulkData && yourCityBulkData.list[17].weather[0].icon}.png`} width='15px' height='15px' alt='Weather Icon'>
                                    </img>
                                    {yourCityBulkData && yourCityBulkData.list[17].weather[0].main}
                                </span>
                            </div>

                            <div className={styles.forecastBox}>
                                <span>{yourCityBulkData && convertData(`${yourCityBulkData.list[25].dt_txt}`.slice(0, 10))}</span>
                                
                                <div>
                                    <span className={styles.minmax}>High: {Math.round(yourCityBulkData && yourCityBulkData.list[25].main.temp_max)}°</span>
                                    <span className={styles.minmax}>Low: {Math.round(yourCityBulkData && yourCityBulkData.list[25].main.temp_min)}°</span>
                                </div>
                                <h1>{yourCityBulkData && `${yourCityBulkData.list[25].main.temp}`.slice(0, 2)}°<span>F</span></h1>

                                <span className={styles.descCont}>
                                    <img rel='preload preconnect' loading='lazy' src={`http://openweathermap.org/img/w/${yourCityBulkData && yourCityBulkData.list[25].weather[0].icon}.png`} width='15px' height='15px' alt='Thermometer Icon'>
                                    </img>
                                    {yourCityBulkData && yourCityBulkData.list[25].weather[0].main}
                                </span>
                            </div>
                            </>
                        }
                    </section>
                    
                    <div className={styles.cityImg}>
                        <div>
                            <Line options={{ maintainAspectRatio: true }} width="26.5" height="10" className={styles.chart} data={chartData} />
                        </div>
                        <div>
                            <article>
                                <span>Longitude</span>
                                <p>{yourCityWeatherData && yourCityWeatherData.coord.lon}</p>
                                <img rel='preload preconnect' loading='lazy' src={longitu} width='15px' height='15px' alt='Longitude Icon'>
                                </img>
                            </article>
                            <article>
                                <span>Latitude</span>
                                <p>{yourCityWeatherData && yourCityWeatherData.coord.lat}</p>
                                <img rel='preload preconnect' loading='lazy' src={latitu} width='15px' height='15px' alt='Latitude Icon'>
                                </img>
                            </article>
                            <article>
                                <span>Sunrise</span>
                                <p>{sunrise}</p>
                                <img rel='preload preconnect' loading='lazy' src={riseimg} width='15px' height='15px' alt='Sunrise Icon'>
                                </img>
                            </article>
                            <article>
                                <span>Sunset</span>
                                <p>{sunset}</p>
                                <img rel='preload preconnect' loading='lazy' src={setimg} width='15px' height='15px' alt='Sunset Icon'>
                                </img>
                            </article>
                        </div>
                        <img rel='preload preconnect' loading='lazy' src="https://cdn.pixabay.com/photo/2021/05/10/14/48/rain-6243559_1280.jpg" width='12px' height='12px' alt='Thermometer Icon'>
                        </img>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default WeatherPage;