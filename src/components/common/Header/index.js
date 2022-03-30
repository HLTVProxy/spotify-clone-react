import { useState } from 'react';
import logo from './../../../img/Spotify_Icon_RGB_Green.png';
import { Layout, Drawer, Button, Avatar, Dropdown, Menu } from 'antd';
import {
  MenuOutlined,
  UserOutlined,
  LeftOutlined,
  RightOutlined,
  FormOutlined
} from '@ant-design/icons';
import styled from 'styled-components';

const { Header } = Layout;

export default function Index({ menu }) {
  const avatarMenu = (
    <AvatarMenu>
      <Menu.Item key="account" className="account">
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://www.spotify.com/tw/account/overview/?utm_source=spotify&utm_medium=menu&utm_campaign=your_account"
        >
          帳戶
          <FormOutlined />
        </a>
      </Menu.Item>
      <Menu.Item key="user">
        <a rel="noopener noreferrer" href="#!">
          個人檔案
        </a>
      </Menu.Item>
      <Menu.Item key="logout">
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
          <ButtonGroup>
            <StyledActionButton
              onClick={() => {
                window.history.back();
              }}
            >
              <LeftOutlined style={{ width: 24 }} />
            </StyledActionButton>
            <StyledActionButton
              onClick={() => {
                window.history.forward();
              }}
            >
              <RightOutlined style={{ width: 24 }} />
            </StyledActionButton>
          </ButtonGroup>
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
  .left-nav {
    display: flex;
    justify-content: center;
    align-items: center;
  }
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
    width: 200px;
    color: #fff;
    &:hover {
      background-color: #1db954;
    }
  }
  .ant-dropdown-menu-item {
    padding: 12px 16px;
  }
  .account a{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  margin-left: 16px;
`;

const StyledActionButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  background-color: #000;
  color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.7);
  border-radius: 50%;
  margin-right: 16px;
  cursor: pointer;
`;
