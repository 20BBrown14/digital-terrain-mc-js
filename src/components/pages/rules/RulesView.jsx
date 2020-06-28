import React from 'react';
import { Collapse, Typography } from 'antd';
import './Rules.css';
import rules from '../../../constants/rules.json';

const buildRulesInformation = (rulesArray) => (
  rulesArray.map((rule, index) => (
    <p><Typography.Text className="rules-page-text">{`${index + 1}. ${rule}`}</Typography.Text></p>
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
const RulesView = () => {
  const panelInformation = buildCollapsePanels(rules);
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

export default RulesView;
