import { useState, useEffect } from 'react';
import { Menu, Divider } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import apiClient from '../../spotify';

export default function MobileSider({
  topics,
  selectedKey,
  changeSelectedKey,
}) {
  const [savedPlaylists, setSavedPlaylists] = useState([]);

  useEffect(() => {
    fetchCollectionPlaylists();
  }, []);

  const fetchCollectionPlaylists = () => {
    apiClient
      .get(`/me/playlists`)
      .then((res) => {
        let playlists = res.data.items.map((playlist) => {
          return {
            id: playlist.id,
            name: playlist.name,
          };
        });
        setSavedPlaylists(playlists);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let menuItems = topics.map((topic) => {
    return (
      <Menu.Item
        className="menu-selected-color"
        onClick={changeSelectedKey}
        key={topic.key}
      >
        <Link to={`${topic.path}`}>{topic.name}</Link>
      </Menu.Item>
    );
  });

  let playlistItems = savedPlaylists.map((playlist, idx) => {
    // <StyledDivider />
    return (
      <Menu.Item
        className={`playlist-item ${idx === 0 ? 'first-playlist-item' : ''}`}
        onClick={changeSelectedKey}
        key={playlist.id}
      >
        <Link to={`playlist/${playlist.id}`}>{playlist.name}</Link>
      </Menu.Item>
    );
  });

  return (
    <StyledMenu mode="inline" selectedKeys={[selectedKey]} theme="dark">
      {menuItems}

      {playlistItems}
    </StyledMenu>
  );
}

const StyledMenu = styled(Menu)`
  height: 100%;
  .ant-menu-item.ant-menu-item-selected.ant-menu-item-only-child.playlist-item {
    background-color: transparent;
  }
  .ant-menu-item.ant-menu-item-selected.ant-menu-item-only-child.playlist-item.first-playlist-item,
  .ant-menu-item.ant-menu-item-only-child.playlist-item.first-playlist-item {
    margin-bottom: -8px;
  }
  .first-playlist-item {
    height: 64px;
    line-height: 64px;
    margin-top: 16px;
  }
  .first-playlist-item::before {
    content: '';
    width: 100%;
    height: 16px;
    border-top: 1px solid #282828;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const StyledDiv = styled.div`
  padding: 0 16px;
  .ant-menu-item:not(:last-child) {
    margin-bottom: 0;
  }
  .ant-menu-item.ant-menu-item-active.ant-menu-item-only-child.playlist-item,
  .ant-menu-item.ant-menu-item-only-child.playlist-item {
    padding: 0 16px;
    height: 32px;
    line-height: 32px;
  }
  .playlist-item span a {
    color: rgba(255, 255, 255, 0.65);
  }
`;

const StyledDivider = styled(Divider)`
  background-color: rgba(255, 255, 255, 0.65);
  margin-bottom: 16px;
`;
