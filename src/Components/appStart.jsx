import styles from '../Components/style.module.css';

import sun from "src/assets/sun.png";
import cloud from "src/assets/cloud.png";

import React, { useState, useEffect } from "react";

const AppStart = ({foundData, setParentState}) => {
    const [value, setValue] = useState('');
    const [yourCityWeatherData, setYourCityWeatherData] = useState('');
    const [getCitySate, setGetCityState] = useState('');
    const [splits, setSplit] = useState('');

    const butFirst = () => {
        setSplit(getCitySate.split(","));
        foundData(getCitySate.split(","));
        setParentState('element2');
    }

    async function setParent(){
        butFirst();
    }

    const handleSubmit = async (e) => {        
        e.preventDefault();

        await setParent();
    }

    //console.log(splits)

    return(
        <main className={styles.appStartPage}>
            <section className={styles.content}>
                <article className={styles.scrollCont}>
                    <div className={styles.sun}>
                        <img rel='preload preconnect' loading='lazy' src={sun} width='50%' height='50%' alt='Sun'>
                        </img>
                    </div>
                    <div className={styles.sun}>
                        <img rel='preload preconnect' loading='lazy' src={cloud} width='75%' height='75%' alt='Cloud'>
                        </img>
                    </div>
                    <section className={styles.appStart}>
                        <div>
                            <h1>CastPhere</h1>
                            <span>Weather on the go.</span>
                        </div>

                        <div>
                            <p>Get the temperature for: <span>city and state</span></p>
                            <form onSubmit={handleSubmit} className={styles.form}>
                                <label htmlFor="search">
                                    <input className={styles.searchInput} type="text" required placeholder="City, St Code" id="search" value={getCitySate} onInput={(e)=>setGetCityState(e.target.value)} />
                                    <div className={styles.fancyBg} />
                                    <div value={""} onClick={()=>setGetCityState(value)} className={styles.searchIcon}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className={styles.h5} viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <button title='Submit' type="submit" className={styles.followBtn}>
                                        <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.r14}>
                                            <g>
                                                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
                                            </g>
                                        </svg>
                                    </button>
                                </label>
                            </form> 
                        </div>
                    </section>
                </article>
            </section>
        </main>
    );
}

export default AppStart;