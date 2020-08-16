import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Collapse, List } from 'antd';
import LoadingScreen from '../LoadingScreen';
import ErrorScreen from '../ErrorScreen';
import './ServerInformation.css';

const propTypes = {
  /* Whether view is loading */
  isLoading: PropTypes.bool.isRequired,
  /* Whether service has failure */
  hasServiceFailure: PropTypes.bool.isRequired,
  /* Server information to display */
  serverInformation: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]).isRequired),
};

const defaultProps = {
  serverInformation: null,
};

const buildGeneralInformationPanel = (generalInfoObject, panelKey) => {
  const generalInfo = generalInfoObject.map((info, index) => (
    /* eslint-disable-next-line react/no-array-index-key */
    <p key={`generalInfo-p-${index}`}>
      {/* eslint-disable-next-line react/no-array-index-key */}
      <Typography.Text className="server-information-page-text" key={`generalInfo-text-${index}`}>
        {info}
      </Typography.Text>
    </p>
  ));
  return (
    <Collapse.Panel header={<h1>General Information</h1>} key={panelKey}>
      {generalInfo}
    </Collapse.Panel>
  );
};

const buildServerURLInformationPanel = (serverURLInfoObject, panelKey) => {
  const serverURLInfo = Object.keys(serverURLInfoObject).map((key, index) => {
    if (key === 'Server IP') {
      return (
        /* eslint-disable-next-line react/no-array-index-key */
        <p key={`serverURL-p-${index}`}>
          {/* eslint-disable-next-line react/no-array-index-key */}
          <Typography.Text className="server-information-page-text" key={`ServerURL-text-${index}`}>
            {`Server IP: ${serverURLInfoObject[key]}`}
          </Typography.Text>
        </p>
      );
    }
    if (key === 'Dynmap URL') {
      return (
        /* eslint-disable-next-line react/no-array-index-key */
        <p key={`serverURL-p-${index}`}>
          {/* eslint-disable-next-line react/no-array-index-key */}
          <Typography.Text className="server-information-page-text" key={`serverURL-text-${index}`}>
            {'Dynmap URL: '}
          </Typography.Text>
          <a href={serverURLInfoObject[key]} className="server-information-page-text">
            {`${serverURLInfoObject[key]}`}
          </a>
        </p>
      );
    }
    return '';
  });
  return (
    <Collapse.Panel header={<h1>Important URLs</h1>} key={panelKey}>
      {serverURLInfo}
    </Collapse.Panel>
  );
};

const buildDatapacksPluginsPanel = (datapacksPluginsInfo, header, panelKey) => (
  <Collapse.Panel header={<h1>{header}</h1>} key={panelKey}>
    <List
      grid={{ column: 3 }}
      dataSource={datapacksPluginsInfo}
      renderItem={(datapackPlugin) => (
        <List.Item>
          <Typography.Text className="server-information-page-text">
            {datapackPlugin}
          </Typography.Text>
        </List.Item>
      )}
    />
  </Collapse.Panel>
);

const buildHardwarePanel = (hardwareInfo, panelKey) => {
  const processedHardwareInfo = Object.keys(hardwareInfo).map((key, index) => (
    /* eslint-disable-next-line react/no-array-index-key */
    <p key={`hardware-p-${index}`}>
      {/* eslint-disable-next-line react/no-array-index-key */}
      <Typography.Text className="server-information-page-text" key={`hardware-text-${index}`}>
        {`${key}: ${hardwareInfo[key]}`}
      </Typography.Text>
    </p>
  ));
  return (
    <Collapse.Panel header={<h1>Hardware Information</h1>} key={panelKey}>
      {processedHardwareInfo}
    </Collapse.Panel>
  );
};

const buildRolesPanel = (rolesInfo, panelKey) => {
  const processCommandsInfo = (commandsObject) => {
    if (typeof commandsObject === 'object') {
      return (
        Object.keys(commandsObject).map((key, index) => (
          /* eslint-disable-next-line react/no-array-index-key */
          <p key={`rolesCommands-p-${index}`}>
            {/* eslint-disable-next-line react/no-array-index-key */}
            <Typography.Text className="server-information-page-text" key={`rolesCommands-text-${index}`}>
              {`${key}: ${commandsObject[key]}`}
            </Typography.Text>
          </p>
        ))
      );
    } if (typeof commandsObject === 'string') {
      return (
        <p key="rolesCommands-p">
          <Typography.Text className="server-information-page-text" key="rolesCommands-text">
            {commandsObject}
          </Typography.Text>
        </p>
      );
    }
    return '';
  };

  const processedRolesInfo = Object.keys(rolesInfo).map((role, index) => {
    if (rolesInfo[role].commands) {
      return (
        /* eslint-disable-next-line react/no-array-index-key */
        <Collapse.Panel
          header={(
            <>
              <h1>
                {`${role}: `}
              </h1>
              {`${rolesInfo[role].description}`}
            </>
          )}
          /* eslint-disable-next-line react/no-array-index-key */
          key={index}
        >
          {/* eslint-disable-next-line react/no-array-index-key */}
          <p key={`rolesSubtitle-p-${index}`}>
            {/* eslint-disable-next-line react/no-array-index-key */}
            <Typography.Text className="server-information-page-text" key={`rolesSubtitle-text-${index}`}>
              Commands:
            </Typography.Text>
          </p>
          {processCommandsInfo(rolesInfo[role].commands)}
        </Collapse.Panel>
      );
    }
    return (
      /* eslint-disable-next-line react/no-array-index-key */
      <Collapse.Panel
        header={(
          <>
            <h1>
              {`${role}: `}
            </h1>
            {`${rolesInfo[role].description}`}
          </>
        )}
        /* eslint-disable-next-line react/no-array-index-key */
        key={index}
      />
    );
  });

  return (
    <Collapse.Panel header={<h1>Roles</h1>} key={panelKey}>
      <p key="roles-p">
        <Typography.Text className="server-information-page-text" key="roles-text">
          Every role also has the command permissions for all the roles below it
        </Typography.Text>
      </p>
      <Collapse>
        {processedRolesInfo}
      </Collapse>
    </Collapse.Panel>
  );
};

const buildHelpfulLinksPanel = (helpfulLinksInfo, panelKey) => {
  const processedLinksInfo = Object.keys(helpfulLinksInfo).map((key, index) => (
    /* eslint-disable-next-line react/no-array-index-key */
    <p key={`links-p-${index}`}>
      {/* eslint-disable-next-line react/no-array-index-key */}
      <Typography.Text className="server-information-page-text" key={`links-text-${index}`}>
        {`${key}: `}
      </Typography.Text>
      <a href={helpfulLinksInfo[key]} className="server-information-page-text">
        {`${helpfulLinksInfo[key]}`}
      </a>
    </p>
  ));

  return (
    <Collapse.Panel header={<h1>Helpful Links</h1>} key={panelKey}>
      {processedLinksInfo}
    </Collapse.Panel>
  );
};

/**
 * Server information page view.
 */
const ServerInformationView = (props) => {
  const {
    isLoading,
    hasServiceFailure,
    serverInformation,
  } = props;

  if (isLoading) {
    return <LoadingScreen />;
  } if (hasServiceFailure) {
    return <ErrorScreen />;
  }
  return (
    <div className="server-information-page-content">
      <Typography.Title className="server-information-page-title">
        Digital Terrain Server Information
      </Typography.Title>
      {serverInformation
        && (
        <Collapse defaultActiveKey={[0]}>
          {buildGeneralInformationPanel(serverInformation['General Information'], 0)}
          {buildServerURLInformationPanel(serverInformation['Server URLs'], 1)}
          {buildDatapacksPluginsPanel(serverInformation.Datapacks, 'Datapacks', 2)}
          {buildDatapacksPluginsPanel(serverInformation.Plugins, 'Plugins', 3)}
          {buildHardwarePanel(serverInformation.Hardware, 4)}
          {buildRolesPanel(serverInformation.Roles, 5)}
          {buildHelpfulLinksPanel(serverInformation['Helpful Links'], 6)}
        </Collapse>
        )}
    </div>
  );
};

ServerInformationView.propTypes = propTypes;
ServerInformationView.defaultProps = defaultProps;

export default ServerInformationView;
