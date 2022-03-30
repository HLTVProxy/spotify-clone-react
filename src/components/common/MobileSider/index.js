import { Menu, Divider } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default function MobileSider({
  topics,
  selectedKey,
  changeSelectedKey,
}) {
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

  return (
    <StyledMenu mode="inline" selectedKeys={[selectedKey]} theme="dark">
      {menuItems}
      <StyledDiv>
        <StyledDivider />
        <Menu.Item key="aa" className="playlist-item">
          <Link to={`playlists/a`}>playlist1</Link>
        </Menu.Item>
        <Menu.Item key="ab" className="playlist-item">
          <Link to={`playlists/b`}>playlist1</Link>
        </Menu.Item>
        <Menu.Item key="ac" className="playlist-item">
          <Link to={`playlists/c`}>playlist1</Link>
        </Menu.Item>
        <Menu.Item key="ad" className="playlist-item">
          <Link to={`playlists/d`}>playlist1</Link>
        </Menu.Item>
        <Menu.Item key="ae" className="playlist-item">
          <Link to={`playlists/e`}>playlist1</Link>
        </Menu.Item>
      </StyledDiv>
    </StyledMenu>
  );
}

const StyledMenu = styled(Menu)`
  height: 100%;
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
