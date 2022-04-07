import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import styled from 'styled-components';

function AvatarMenu() {
  return (
    <StyledMenu>
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
        <Link to="/user">個人檔案</Link>
      </Menu.Item>
      <Menu.Item key="logout">
        <Link to="/logout">
          登出
        </Link>
      </Menu.Item>
    </StyledMenu>
  );
}

export default AvatarMenu;

const StyledMenu = styled(Menu)`
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
  .account a {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
