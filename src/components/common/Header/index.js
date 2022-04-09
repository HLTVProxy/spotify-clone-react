import { useState, useEffect } from 'react';
import logo from './../../../img/Spotify_Icon_RGB_Green.png';
import { Layout, Drawer, Button, Avatar, Dropdown } from 'antd';
import {
  MenuOutlined,
  CaretDownOutlined,
  CaretUpOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import avatarMenu from './AvatarMenu';
import PageActionButton from './PageActionButton';
import apiClient from '../../../spotify';
const { Header } = Layout;

export default function Index({ menu }) {
  const [siderVisible, setSiderVisible] = useState(false);
  const [avatarMenuVisible, setAvatarMenuVisible] = useState(false);
  const [profileInfo, setProfileInfo] = useState({ name: '', avatarUrl: '' });
  useEffect(() => {
    apiClient
      .get('me')
      .then((res) => {
        setProfileInfo({
          name: res.data.display_name,
          avatarUrl: res.data.images[0]?.url,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Header>
      <StyledNav>
        <div className="left-nav">
          <StyledButton
            className="menu"
            type="primary"
            icon={<MenuOutlined />}
            onClick={() => setSiderVisible(true)}
          />
          <Drawer
            placement="left"
            onClick={() => setSiderVisible(false)}
            onClose={() => setSiderVisible(false)}
            visible={siderVisible}
          >
            {menu}
          </Drawer>
          <a href="/">
            <img src={logo} className="logo" alt="logo" />
          </a>
          <PageActionButton />
        </div>
        <div className="right-nav">
          <StyledDropdown
            overlay={avatarMenu}
            trigger={['click']}
            placement="bottomRight"
            visible={avatarMenuVisible}
            onClick={() => setAvatarMenuVisible(!avatarMenuVisible)}
          >
            <ProfileDiv>
              <Avatar size="large" src={profileInfo.avatarUrl} />
              <span className="user-name">{profileInfo.name}</span>
              {avatarMenuVisible ? <CaretUpOutlined /> : <CaretDownOutlined />}
            </ProfileDiv>
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
    line-height: 0px;
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

const ProfileDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: #333; */
  color: #fff;
  padding: 0 16px;
  border-radius: 16px;
  .user-name {
    padding: 0 8px;
  }
`;
