import React from 'react';
import 'spinkit/spinkit.min.css';
import './LoadingScreen.css';

const loadingScreen = () => (
  <div className="loading-screen-container">
    <div className="sk-chase loading-screen-element">
      <div className="sk-chase-dot" />
      <div className="sk-chase-dot" />
      <div className="sk-chase-dot" />
      <div className="sk-chase-dot" />
      <div className="sk-chase-dot" />
      <div className="sk-chase-dot" />
    </div>
  </div>
);

export default loadingScreen;
