import { useState } from 'react';
import styled from 'styled-components';
import { Dropdown, Menu } from 'antd';

function ActionBar({ type = 'album' }) {
  const menu = (
    <StyledMenu>
      <Menu.Item key="add-to-queue">新增至佇列</Menu.Item>
      <Menu.Item key="add-to-collection">新增至你的音樂庫</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="share">複製播放清單連結</Menu.Item>
    </StyledMenu>
  );

  const handlePlayClick = () => {
    alert('播放');
  };

  const [isArtistFollow, setIsArtistFollow] = useState(false);
  const handleFollowClick = () => {
    setIsArtistFollow(!isArtistFollow);
  };

  const [isSave, setIsSave] = useState(false);
  const handleSaveClick = () => {
    setIsSave(!isSave);
  };

  return (
    <StyledDiv>
      <PlayButton
        onClick={() => {
          handlePlayClick();
        }}
      >
        <svg role="img" height="24" width="24" viewBox="0 0 24 24">
          <path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path>
        </svg>
      </PlayButton>
      {type === 'album' ? (
        <SvgButton
          className="save-btn"
          isSave={isSave}
          onClick={() => {
            handleSaveClick();
          }}
        >
          {isSave ? (
            <svg
              role="img"
              height="32"
              width="32"
              viewBox="0 0 24 24"
              class="Svg-sc-1bi12j5-0 jgfuCe"
            >
              <path d="M8.667 1.912a6.257 6.257 0 00-7.462 7.677c.24.906.683 1.747 1.295 2.457l7.955 9.482a2.015 2.015 0 003.09 0l7.956-9.482a6.188 6.188 0 001.382-5.234l-.49.097.49-.099a6.303 6.303 0 00-5.162-4.98h-.002a6.24 6.24 0 00-5.295 1.65.623.623 0 01-.848 0 6.257 6.257 0 00-2.91-1.568z"></path>
            </svg>
          ) : (
            <svg role="img" height="32" width="32" viewBox="0 0 24 24">
              <path
                d="M5.21 1.57a6.757 6.757 0 016.708 1.545.124.124 0 00.165 0 6.741 6.741 0 015.715-1.78l.004.001a6.802 6.802 0 015.571 5.376v.003a6.689 6.689 0 01-1.49 5.655l-7.954 9.48a2.518 2.518 0 01-3.857 0L2.12 12.37A6.683 6.683 0 01.627 6.714 6.757 6.757 0 015.21 1.57zm3.12 1.803a4.757 4.757 0 00-5.74 3.725l-.001.002a4.684 4.684 0 001.049 3.969l.009.01 7.958 9.485a.518.518 0 00.79 0l7.968-9.495a4.688 4.688 0 001.049-3.965 4.803 4.803 0 00-3.931-3.794 4.74 4.74 0 00-4.023 1.256l-.008.008a2.123 2.123 0 01-2.9 0l-.007-.007a4.757 4.757 0 00-2.214-1.194z"
              ></path>
            </svg>
          )}
        </SvgButton>
      ) : (
        <FollowButton
          className="follow-btn"
          onClick={() => {
            handleFollowClick();
          }}
        >
          {isArtistFollow ? '正在關注' : '關注'}
        </FollowButton>
      )}

      <Dropdown overlay={menu} trigger={['hover']}>
        <SvgButton className="detail-btn">
          <svg role="img" height="32" width="32" viewBox="0 0 24 24">
            <path d="M4.5 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm15 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm-7.5 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
          </svg>
        </SvgButton>
      </Dropdown>
    </StyledDiv>
  );
}

export default ActionBar;

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 0;
  button {
    margin-right: 16px;
  }
`;

const StyledMenu = styled(Menu)`
  background-color: #282828;
  color: #fff;
  .ant-dropdown-menu-item {
    width: 200px;
    color: rgba(255, 255, 255, 0.9);
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
`;

const PlayButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  background-color: #1db954;
  border: none;
  border-radius: 50%;
  transition: 0.5s ease;

  &:hover {
    transform: scale(1.05);
    background-color: #1fdf64;
  }
`;

const SvgButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  color: ${(props) => (props.isSave ? '#1db954' : 'rgba(255, 255, 255, 0.7)')};
  border: none;
  svg {
    fill: currentcolor;
  }
  &:hover {
    color: ${(props) => (props.isSave ? '#1db954' : '#fff')};
  }
`;

const FollowButton = styled.button`
  background-color: transparent;
  color: #fff;
  font-size: 12px;
  padding: 8px 16px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  &:hover {
    border-color: #fff;
  }
`;
