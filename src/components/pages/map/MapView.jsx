import React from 'react';
import './Map.css';

/**
 * Map page view.
 */
const MapView = () => (
  <div>
    <iframe src="https://dynmap-reverse-proxy.herokuapp.com/" className="map-iframe" title="Digital Terrain Dynmap">
      <p>Your browser does not support this type of content.</p>
    </iframe>
  </div>
);

export default MapView;
