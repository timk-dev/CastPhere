import React from "react";

import { Route, Routes } from "react-router-dom";
 
import reactLazyWithRetry from '@fatso83/retry-dynamic-import/react-lazy';

const LazyAppStart = reactLazyWithRetry(() => import("./Components/appStart"));
const LazyHome = reactLazyWithRetry(() => import("./Components/home"));
const LazyWeatherPage = reactLazyWithRetry(() => import("./Components/weatherPage"));

function App() {
  return (
    <>

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=Monoton&family=Questrial&family=VT323&display=swap" rel="stylesheet" />
      
      <main>
        <Routes>
          <Route path="/" exact="true" element={<LazyHome />} />
          <Route path="/start" exact="true" element={<LazyAppStart />} />
          <Route path="/weather" exact="true" element={<LazyWeatherPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App
