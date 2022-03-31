import { useState } from 'react';
import { Row, Col, Card } from 'antd';
import styled from 'styled-components';
const { Meta } = Card;

function CardList({ title, type = 'song', detail = true }) {
  const handleClick = (type) => {
    if (type === 'playlist') {
      window.location.href = `${window.location}/aaaa`;
    }
  };
  const borderRadiusType = ['artist', 'fans', 'follow'];
  const noPlayButtonType = ['fans', 'follow'];
  // fake data
  let dataArr = [];
  for (let i = 0; i < 8; i++) {
    dataArr.push(
      <Col xs={12} md={8} lg={8} xl={4} xxl={3}>
        <StyledCard
          hoverable
          style={{ width: '100%', padding: 16 }}
          cover={
            <>
              <img
                style={{
                  borderRadius: borderRadiusType.includes(type) ? '50%' : '',
                }}
                alt="example"
                src="https://i.scdn.co/image/ab67616d00001e02a9faac440442a13742be9056"
              />
            </>
          }
          onClick={(e) => {
            if (e.target.tagName === 'IMG' || e.target.tagName === 'DIV') {
              handleClick(type);
            }
          }}
        >
          {noPlayButtonType.includes(type) ? (
            ''
          ) : (
            <PlayButton>
              <svg role="img" height="24" width="24" viewBox="0 0 24 24">
                <path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path>
              </svg>
            </PlayButton>
          )}

          <Meta title="歌曲名/歌手名" description="歌手名/描述" />
        </StyledCard>
      </Col>
    );
  }
  return (
    <>
      <StyledRow>
        <StyledCol span={24}>
          <h1>{title}</h1>
          {detail == true ? <a href="#!">查看全部</a> : ''}
        </StyledCol>
      </StyledRow>
      <Row gutter={[16, 16]}>{dataArr}</Row>
    </>
  );
}

export default CardList;

const StyledRow = styled(Row)`
  padding-top: 16px;
`;

const StyledCol = styled(Col)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  div {
    cursor: pointer;
  }
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
    display: flex;
  }

  .ant-card-body {
    padding: 16px 0;
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
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  background-color: #1db954;
  border: none;
  border-radius: 50%;
  position: absolute;
  bottom: 80px;
  right: 0;
  z-index: 3;
  transition: 0.5s ease;

  &:hover {
    transform: scale(1.05);
    background-color: #1fdf64;
  }
`;
