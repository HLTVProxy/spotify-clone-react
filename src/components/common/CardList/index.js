import React from 'react';
import { Row, Col, Card } from 'antd';
import styled from 'styled-components';
const { Meta } = Card;

function SongCardList({ title, type = 'song', detail = true }) {
  // fake data
  let dataArr = [];
  for (let i = 0; i < 8; i++) {
    dataArr.push(
      <Col span={3}>
        <a href="/playlists/aaaa">
          <StyledCard
            hoverable
            style={{ width: '100%', padding: 16 }}
            cover={
              <>
                <img
                  style={{
                    borderRadius: type == 'artist' ? '50%' : '',
                  }}
                  alt="example"
                  src="https://i.scdn.co/image/ab67616d00001e02a9faac440442a13742be9056"
                />
                <PlayButton>
                  <div>
                    <svg role="img" height="24" width="24" viewBox="0 0 24 24">
                      <path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path>
                    </svg>
                  </div>
                </PlayButton>
              </>
            }
          >
            <Meta title="歌曲名/歌手名" description="歌手名/描述" />
          </StyledCard>
        </a>
      </Col>
    );
  }
  return (
    <>
      <StyledRow>
        <StyledCol span={24}>
          <h1>{title}</h1>
          {detail == true ? <a href="#!">查看更多</a> : ''}
        </StyledCol>
      </StyledRow>
      <Row gutter={[16, 16]}>{dataArr}</Row>
    </>
  );
}

export default SongCardList;

const StyledRow = styled(Row)`
  padding-top: 16px;
`;

const StyledCol = styled(Col)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  a {
    color: #b3b3b3;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const StyledCard = styled(Card)`
  background-color: #181818;
  border: 1px solid #181818;
  border-radius: 8px;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #282828;
  }

  &:hover button {
    display: block;
  }

  .ant-card-body {
    padding: 16px;
  }

  .ant-card-meta-title,
  .ant-card-meta-description {
    color: #fff;
  }

  .ant-card-meta-detail .ant-card-meta-title {
    margin-bottom: 4px;
  }

  .ant-card-meta-detail .ant-card-meta-description {
    color: #b3b3b3;
  }
`;

const PlayButton = styled.button`
  display: none;
  width: 50px;
  height: 50px;
  background-color: #1db954;
  border: none;
  border-radius: 50%;
  position: absolute;
  bottom: 80px;
  right: 0;
  transition: 0.5s ease;

  &:hover {
    transform: scale(1.05);
    background-color: #1fdf64;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
