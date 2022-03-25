import { useState } from 'react';
import logo from './../../../img/Spotify_Icon_RGB_Green.png';
import { Layout, Drawer, Button, Avatar, Dropdown, Menu } from 'antd';
import { MenuOutlined, UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { Header } = Layout;

export default function Index({ menu }) {
  const avatarMenu = (
    <AvatarMenu>
      <Menu.Item>
        <a rel="noopener noreferrer" href="#!">
          登出
        </a>
      </Menu.Item>
    </AvatarMenu>
  );
  const [visible, setVisible] = useState(false);
  return (
    <Header>
      <StyledNav>
        <div className="left-nav">
          <StyledButton
            className="menu"
            type="primary"
            icon={<MenuOutlined />}
            onClick={() => setVisible(true)}
          />
          <Drawer
            placement="left"
            onClick={() => setVisible(false)}
            onClose={() => setVisible(false)}
            visible={visible}
          >
            {menu}
          </Drawer>
          <a href="/">
            <img src={logo} className="logo" alt="logo" />
          </a>
        </div>
        <div className="right-nav">
          <StyledDropdown
            overlay={avatarMenu}
            trigger={['click']}
            placement="bottomRight"
          >
            <Avatar size="large" icon={<UserOutlined />} />
          </StyledDropdown>
        </div>
      </StyledNav>
    </Header>
  );
}

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .logo {
    height: 32px;
    margin-left: 16px;
  }
  .right-nav {
    display: flex;
    align-items: center;
  }
  @media (min-width: 992px) {
    .menu {
      display: none;
    }
    .logo {
      margin-left: 0px;
    }
  }
`;

const StyledButton = styled(Button)`
  background-color: rgba(0, 0, 0, 0.85);
  border-color: rgba(0, 0, 0, 0.85);
  &:hover {
    background-color: rgba(0, 0, 0, 0.85);
    border-color: rgba(0, 0, 0, 0.85);
  }
`;

const StyledDropdown = styled(Dropdown)`
  &:hover {
    cursor: pointer;
  }
`;

const AvatarMenu = styled(Menu)`
  background-color: #282828;
  .ant-dropdown-menu-item {
    width: 100px;
    color: #fff;
    &:hover {
      background-color: #1db954;
    }
  }
`;
