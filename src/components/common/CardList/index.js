import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col, Card } from 'antd';
import styled from 'styled-components';
import PlayerContext from '../../../contexts/PlayerContext';
const { Meta } = Card;

function CardList({
  title,
  type = 'albums',
  detail = true,
  detailText = '查看全部',
  detailHref = '',
  children,
}) {
  let navigate = useNavigate();
  const handleClick = (type, id) => {
    switch (type) {
      case 'playlist':
        navigate(`/collection/playlists/${id}`);
        break;
      case 'playlists':
        navigate(`/playlist/${id}`);
        break;
      case 'artist':
        navigate(`/artist/${id}`);
        break;
      case 'albums':
        navigate(`/album/${id}`);
        break;
      case 'tracks':
        navigate(`/track/${id}`);
        break;
      default:
        navigate('/');
        break;
    }
  };

  const borderRadiusType = ['artist', 'fans', 'follow'];
  const noPlayButtonType = ['fans', 'follow'];

  const { playTrack } = useContext(PlayerContext);

  // Render card
  let dataArray = children?.map((item) => {
    return (
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
                alt="cover image"
                src={item.coverUrl}
              />
            </>
          }
          onClick={(e) => {
            if (e.target.tagName === 'IMG' || e.target.tagName === 'DIV') {
              handleClick(type, item.id);
            } else {
              playTrack(item.uri);
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

          <Meta
            title={item.title}
            description={
              type === 'tracks' ? (
                <div className="artist-links">
                  {item.descriptions.map((artist) => {
                    return (
                      <Link to={`/artist/${artist.id}`}>{artist.name}</Link>
                    );
                  })}
                </div>
              ) : (
                item.descriptions
              )
            }
          />
        </StyledCard>
      </Col>
    );
  });

  return (
    <>
      <Row>
        <StyledCol span={24}>
          <h1>{title}</h1>
          {detail === true ? <Link to={detailHref}>{detailText}</Link> : ''}
        </StyledCol>
      </Row>
      <Row gutter={[16, 16]}>{dataArray}</Row>
    </>
  );
}

export default CardList;

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

  .artist-links {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  .ant-card-meta-detail .ant-card-meta-description {
    color: #b3b3b3;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .ant-card-meta-detail .ant-card-meta-description a {
    color: #b3b3b3;
    margin-right: 4px;
  }

  .ant-card-meta-detail .ant-card-meta-description a:hover {
    text-decoration: underline;
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
  top: 140px;
  right: 0;
  z-index: 3;
  transition: 0.5s ease;

  &:hover {
    transform: scale(1.05);
    background-color: #1fdf64;
  }
`;
