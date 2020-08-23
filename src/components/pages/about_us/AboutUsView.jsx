import React from 'react';
import PropTypes from 'prop-types';
import { List, Card, Typography } from 'antd';
import './AboutUs.css';
import ErrorScreen from '../ErrorScreen';
import LoadingScreen from '../LoadingScreen';

const propTypes = {
  /* Whether view is loading */
  isLoading: PropTypes.bool.isRequired,
  /* Whether service failed */
  hasServiceFailure: PropTypes.bool.isRequired,
  /* About us information to display */
  aboutUsInformation: PropTypes.objectOf(PropTypes.string).isRequired,
  /* Veterans information to display */
  veteransInformation: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const buildHeadDisplayComponents = (UUIDInformation) => (
  Object.keys(UUIDInformation).map((playerName) => (
    {
      image: (
        <img
          className="about-us-card-cover"
          src={`https://crafatar.com/renders/head/${UUIDInformation[playerName]}?overlay`}
          alt="Head not found"
        />),
      playerName: (
        <Typography.Text>{playerName}</Typography.Text>
      ),
    }
  ))
);

/**
 * About us page view.
 */
const AboutUsView = (props) => {
  const {
    isLoading,
    hasServiceFailure,
    aboutUsInformation,
    veteransInformation,
  } = props;

  if (isLoading) {
    return <LoadingScreen />;
  } if (hasServiceFailure) {
    return <ErrorScreen />;
  }
  return (
    <div className="about-us-content">
      <h1 className="about-us-title">Admins & Mods</h1>
      <List
        grid={{
          xxl: 3,
          xl: 3,
          lg: 3,
          md: 3,
          sm: 2,
          xs: 1,
        }}
        dataSource={buildHeadDisplayComponents(aboutUsInformation)}
        renderItem={(component) => (
          <List.Item>
            <Card
              cover={component.image}
              bordered={false}
              size="small"
            >
              <Card.Meta
                className="about-us-card-subtitle"
                title={component.playerName}
              />
            </Card>
          </List.Item>
        )}
      />
      <h1 className="about-us-title">Veterans</h1>
      <List
        className="about-us-veterans-list"
        grid={{
          xxl: 5,
          xl: 5,
          lg: 5,
          md: 4,
          sm: 3,
          xs: 1,
        }}
        dataSource={veteransInformation}
        renderItem={(player) => (
          <List.Item>
            <Typography.Text>
              {player}
            </Typography.Text>
          </List.Item>
        )}
      />
      <div className="about-us-crafatar">
        {'Thank you to '}
        <a href="https://crafatar.com">Crafatar</a>
        {' for providing avatars.'}
      </div>
    </div>
  );
};

AboutUsView.propTypes = propTypes;

export default AboutUsView;
