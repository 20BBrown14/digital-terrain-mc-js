import React from 'react';
import './Map.css';

/**
 * Map page view.
 */
const MapView = () => (
  <div>
    <iframe src="http://147.135.107.178:4492/index.html" className="map-iframe" title="Digital Terrain Dynmap">
      <p>Your browser does not support this type of content.</p>
    </iframe>
  </div>
);

export default MapView;
