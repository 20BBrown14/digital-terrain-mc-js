import React from 'react';
import PropTypes from 'prop-types';
import { Collapse, Typography } from 'antd';
import './Rules.css';
import LoadingScreen from '../LoadingScreen';
import ErrorScreen from '../ErrorScreen';

const propTypes = {
  rulesInformation: PropTypes.objectOf(PropTypes.array.isRequired).isRequired,
  hasServiceFailure: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const buildRulesInformation = (rulesArray) => (
  rulesArray.map((rule, index) => (
    /* eslint-disable-next-line react/no-array-index-key */
    <p key={`rules-p-${index}`}>
      {/* eslint-disable-next-line react/no-array-index-key */}
      <Typography.Text className="rules-page-text" key={`rules-text-${index}`}>
        {`${index + 1}. ${rule}`}
      </Typography.Text>
    </p>
  ))
);

const buildCollapsePanels = (rulesObject) => {
  const panels = [];
  const panelKeys = [];
  Object.keys(rulesObject).forEach((key, index) => {
    panels.push(
      /* eslint-disable-next-line react/no-array-index-key */
      <Collapse.Panel header={<h1>{key}</h1>} key={index}>
        {buildRulesInformation(rulesObject[key])}
      </Collapse.Panel>,
    );
    panelKeys.push(index);
  });
  return { panels, panelKeys };
};

/**
 * Rules page view.
 */
const RulesView = (props) => {
  const { rulesInformation, hasServiceFailure, isLoading } = props;
  if (isLoading) {
    return (<LoadingScreen />);
  } if (hasServiceFailure) {
    return (<ErrorScreen />);
  }
  const panelInformation = buildCollapsePanels(rulesInformation);
  return (
    <div className="rules-page-content">
      <Typography.Title className="rules-page-title">
        Digital Terrain Rules and Guidelines
      </Typography.Title>
      <Collapse defaultActiveKey={panelInformation.panelKeys}>
        {panelInformation.panels}
      </Collapse>
    </div>
  );
};

RulesView.propTypes = propTypes;

export default RulesView;
