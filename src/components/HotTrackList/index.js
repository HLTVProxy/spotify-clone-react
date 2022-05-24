import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { List, Button } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { msSongListFormat } from '../../helper';
import PlayerContext from '../../contexts/PlayerContext';

function HotTrackList({ title = '熱門', type = 'artist', children }) {
  const [collapse, setCollapse] = useState(false);
  const { playTrack } = useContext(PlayerContext);

  const handlePlay = (uri) => {
    playTrack(uri);
  };

  return (
    <StyledDiv collapse={collapse}>
      {type === 'track' ? (
        <span className="artist-hot-track-text">此藝人的熱門曲目：</span>
      ) : (
        ''
      )}
      <h1>{title}</h1>
      <List
        itemLayout="horizontal"
        size="small"
        dataSource={children}
        renderItem={(item, idx) => (
          <List.Item className={idx > 4 ? 'collapse-item' : ''}>
            <Rank className="rank">
              <span className="rank-num">{idx + 1}</span>
              <PlayButton
                icon={<CaretRightOutlined />}
                size="large"
                onClick={() => handlePlay(item.uri)}
              />
            </Rank>
            <div className="cover">
              <img src={item.album.images[0]?.url} />
            </div>
            <List.Item.Meta
              title={<Link to={`/track/${item.id}`}>{item.name}</Link>}
            />
            <div className="song-info">
              <span className="duration">
                {msSongListFormat(item.duration_ms)}
              </span>
            </div>
          </List.Item>
        )}
      />
      <CollapseTrackButton
        onClick={() => {
          setCollapse(!collapse);
        }}
      >
        {collapse ? '顯示較少內容' : '檢視更多'}
      </CollapseTrackButton>
    </StyledDiv>
  );
}

export default HotTrackList;

const StyledDiv = styled.div`
  padding: 16px 0;

  .artist-hot-track-text {
    color: #b3b3b3;
  }

  .rank {
    color: #fff;
  }

  .cover {
    padding-left: 16px;
  }

  .cover img {
    width: 50px;
  }

  .ant-list-split .ant-list-item {
    border: none;
  }

  .ant-list-item:hover {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    .rank-num {
      display: none;
    }
    button {
      display: block;
    }
  }

  .ant-list-item-meta-title > a {
    color: #fff;
    font-weight: 400;
    padding-left: 24px;
  }

  .ant-list-item-meta-title > a:hover {
    text-decoration: underline;
  }

  .song-info {
    color: #6a6a6a;
  }

  .collapse-item {
    display: ${(props) => (props.collapse ? 'flex' : 'none')};
  }
`;

const Rank = styled.div`
  color: #b3b3b3;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  min-height: 30px;
  min-width: 30px;
  width: 30px;
`;

const PlayButton = styled(Button)`
  display: none;
  background-color: transparent;
  color: #fff;
  width: 30px;
  border: none;
  &:hover,
  &:active,
  &:focus {
    cursor: default;
    background-color: transparent;
    color: #fff;
  }
`;

const CollapseTrackButton = styled.button`
  background-color: transparent;
  color: rgba(255, 255, 255, 0.7);
  border: none;
  padding-top: 16px;
  margin-left: 16px;
  &:hover {
    color: #fff;
  }
`;
