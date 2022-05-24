import { useState, useEffect } from 'react';
import { Menu } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function CollectionTabs() {
  const [selectedTab, setSelectedTab] = useState('');
  const tabs = [
    { name: 'collection-playlists', path: '/playlists' },
    { name: 'collection-artists', path: '/artists' },
    { name: 'collection-albums', path: '/albums' },
  ];

  useEffect(() => {
    let pathName = window.location.pathname;
    let tabIndex = 0;
    tabs.forEach((val, idx) => {
      if (pathName.includes(val.path)) {
        tabIndex = idx;
      }
    });
    setSelectedTab(tabs[tabIndex].name);
  }, [window.location.pathname]);

  const changeSelectedTab = (event) => {
    const key = event.key;
    setSelectedTab(key);
  };

  return (
    <Wrapper>
      <TabMenu theme="dark" mode="horizontal" selectedKeys={[selectedTab]}>
        <Menu.Item key="collection-playlists">
          <Link to="/collection/playlists">播放清單</Link>
        </Menu.Item>
        <Menu.Item key="collection-artists" onClick={changeSelectedTab}>
          <Link to="/collection/artists">藝人</Link>
        </Menu.Item>
        <Menu.Item key="collection-albums">
          <Link to="/collection/albums">專輯</Link>
        </Menu.Item>
      </TabMenu>
    </Wrapper>
  );
}

export default CollectionTabs;

const Wrapper = styled.div`
  padding-top: 16px;
  .ant-menu.ant-menu-dark {
    background-color: #121212;
  }
`;

const TabMenu = styled(Menu)`
  color: #fff;
  border: none;

  .ant-menu-overflow-item.ant-menu-item.ant-menu-item-only-child {
    padding: 0 16px;
  }
  .ant-menu-overflow-item.ant-menu-item.ant-menu-item-selected.ant-menu-item-only-child {
    background-color: #333;
  }
  .ant-menu-overflow-item.ant-menu-item.ant-menu-item-selected.ant-menu-item-only-child:hover {
    background-color: #333;
  }
  .ant-menu-overflow-item.ant-menu-item.ant-menu-item-only-child:hover {
    background-color: #121212;
  }
`;
