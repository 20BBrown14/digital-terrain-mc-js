import React from 'react';
import logo from '../logo.svg';
import './DigitalTerrainWebApp.css';

function DigitalTerrainWebApp() {
  return (
    <div className="digital-terrain-web-app">
      <header className="digital-terrain-web-app-header">
        <img src={logo} className="digital-terrain-web-app-logo" alt="logo" />
        <p>
          Edit <code>src/components/DigitalTerrainWebbApp.jsx</code> and save to reload yo.
        </p>
        <a
          className="digital-terrain-web-app-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default DigitalTerrainWebApp;
