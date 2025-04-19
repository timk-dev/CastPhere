import styles from '../Components/style.module.css';

import noFind from 'src/assets/cantFind.png';
import sun from "src/assets/sun.png";
import cloud from "src/assets/cloud.png";

import React, { useState, useEffect } from "react";
import { IPhoneMockup } from 'react-device-mockup';
import classNames from 'classnames';
 
import WeatherPage from 'components/weatherPage';
import AppStart from 'components/appStart';

import { ErrorBoundary } from "react-error-boundary";

const Home = () => {
    const [show, setShow] = useState(false);
    const [getToken, setGetToken] = useState('');
    const [activeElement, setActiveElement] = useState('element1');
    const [returnedData, setGetReturnedData] = useState('');

    const [visible, setVisible] = useState(false);
    /*
    const [showUser, setUserShown] = useState(false);
    const [showInbox, setInboxShown] = useState(false);
    const [showNotif, setNotifShown] = useState(false);
    */

    //console.log(returnedData, 'home token');

    function Fallback({ error, resetErrorBoundary }) {
        // Call resetErrorBoundary() to reset the error boundary and retry the render.
    
        return (
            <div className={styles.cantFind} role="alert">
                <article>
                    <h1>What's that?</h1>

                    <div>
                        <p>Something went wrong:<br/> <span style={{ color: "red", textAlign: 'center' }}>Couldn't find city/state combination</span></p>
                        {/*<span style={{ color: "red", textAlign: 'center' }}>{error.message}</span>*/}
                        <img rel='preload preconnect' loading='lazy' src={noFind} width='20px' height='20px' alt="Can't Find">
                        </img>
                    </div>

                    <svg onClick={()=>setActiveElement('element1')} className={styles.svg} width="1.5em" height="1.5em" viewBox="0 0 35 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.888 27.024L0.448 13.584L13.888 0.143998V7.488H34.672V19.68H13.888V27.024ZM12.448 23.52V18.24H33.232V8.928H12.448V3.648L2.512 13.584L12.448 23.52Z" fill="black"/>
                    </svg>
                </article>
            </div>
        );
    }

    return(
        <main>
            <section className={styles.landing}>
                <article className={styles.comingSoon}>
                    <h1>
                        Castphere App <span>v1</span>
                        <br/><span>Weather on the go.</span>
                    </h1>
                    <h2>Seamless<br/> app<br/> experience.</h2>

                    <p className={styles.picloDesc}>
                        Customized<br/> daily<br/> forecasts.
                    </p>
                    <span>Custom weather insights.</span>

                </article>

                <article className={styles.appCont}>
                    <div className={styles.island}></div>
                    {activeElement === 'element1' && <AppStart foundData={setGetReturnedData} setParentState={setActiveElement}/>}
                    {activeElement === 'element2' && 
                        <ErrorBoundary  FallbackComponent={Fallback}>
                            <WeatherPage transferData={returnedData} setParentState={setActiveElement}/>
                        </ErrorBoundary>
                    }
                    <div className={styles.bottomTab}></div>
                </article>

                <>
                    <IPhoneMockup className={styles.boxShadow} screenWidth={240} screenType="island" hideStatusBar={true} transparentNavBar={true}>
                        {activeElement === 'element1' && <AppStart foundData={setGetReturnedData} setParentState={setActiveElement}/>}
                        {activeElement === 'element2' && <AppStart foundData={setGetReturnedData} setParentState={setActiveElement}/>}
                    </IPhoneMockup>

                    <span className={styles.summary}>
                        A sleek and intuitive weather app that provides real-time 
                        forecasts and severe weather alerts <span>(coming soon)</span>. Stay informed with accurate, location-based updates.
                    </span>
                </>
            </section>
        </main>
    );
}

export default Home;