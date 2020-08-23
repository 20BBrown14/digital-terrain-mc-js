import React from 'react';
import { Typography } from 'antd';
import './ErrorScreen.css';
import deadHearts from '../../assets/Dead-hearts.gif';

const ErrorScreen = () => (
  <div className="error-screen-container">
    <div className="error-screen-element">
      <img src={deadHearts} alt="" />
      <Typography.Title>
        Something happened trying to load this page. Please try again later.
      </Typography.Title>
    </div>
  </div>
);

export default ErrorScreen;
