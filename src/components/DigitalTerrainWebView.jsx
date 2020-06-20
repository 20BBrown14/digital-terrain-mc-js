import React from 'react';
import { Layout } from 'antd';
import './DigitalTerrainWebApp.css';
import HeaderContainer from './header/HeaderContainer';

function DigitalTerrainWebView() {
  return (
    <Layout>
      <Layout.Header className="web-view-layout-header">
        <HeaderContainer />
      </Layout.Header>
      <Layout.Content />
      <Layout.Footer>
        © 2020 Copyright Digital Terrain
      </Layout.Footer>
    </Layout>
  );
}

export default DigitalTerrainWebView;
