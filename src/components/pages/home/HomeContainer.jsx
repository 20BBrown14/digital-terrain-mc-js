import React from 'react';
import PropTypes from 'prop-types';
import HomeView from './HomeView';

const propTypes = {
  /* Function to navigate to new page */
  navigateToNewPage: PropTypes.func.isRequired,
};

/**
 * Home page container.
 */
const HomeContainer = (props) => {
  const { navigateToNewPage } = props;
  return (
    <HomeView
      navigateToNewPage={navigateToNewPage}
    />
  );
};

HomeContainer.propTypes = propTypes;

export default HomeContainer;
