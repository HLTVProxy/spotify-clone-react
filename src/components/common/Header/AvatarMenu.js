import React from 'react';
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
        <a rel="noopener noreferrer" href="#!">
          個人檔案
        </a>
      </Menu.Item>
      <Menu.Item key="logout">
        <a rel="noopener noreferrer" href="#!">
          登出
        </a>
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
