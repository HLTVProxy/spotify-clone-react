import React from 'react';
import { List, Button } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import styled from 'styled-components';

function HotTrackList() {
  const data = [
    {
      title: '飛鳥和蟬',
    },
    {
      title: '飛鳥和蟬',
    },
    {
      title: '飛鳥和蟬',
    },
    {
      title: '飛鳥和蟬',
    },
    {
      title: '飛鳥和蟬',
    },
    {
      title: '飛鳥和蟬',
    },
    {
      title: '飛鳥和蟬',
    },
    {
      title: '飛鳥和蟬',
    },
    {
      title: '飛鳥和蟬',
    },
    {
      title: '飛鳥和蟬0',
    },
  ];
  return (
    <StyledDiv>
      <h1>熱門</h1>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, idx) => (
          <List.Item>
            <Rank className="rank">
              <span className="rank-num">{idx + 1}</span>
              <PlayButton icon={<CaretRightOutlined />} size="large" />
            </Rank>
            <div className="cover">
              <img src="https://i.scdn.co/image/ab67616d00001e02dfb13a39f0976b75efd6bf84" />
            </div>
            <List.Item.Meta title={<a href="#!">{item.title}</a>} />
            <div className="song-info">
                123
            </div>
          </List.Item>
        )}
      />
    </StyledDiv>
  );
}

export default HotTrackList;

const StyledDiv = styled.div`
  padding-top: 16px;

  .rank {
    padding-left: 16px;
    color: #fff;
  }

  .cover {
    padding-left: 16px;
  }

  .cover img {
    width: 50px;
  }

  .ant-list-item:hover {
      .rank-num {
          display:none;
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
