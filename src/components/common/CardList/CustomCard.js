import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Col, Card } from 'antd';
import styled from 'styled-components';
import PlayerContext from '../../../contexts/PlayerContext';
import UnknownArtist from '../../../img/UnknownArtist.png';
const { Meta } = Card;

function CustomCard({ type = 'albums', item = {} }) {
  let navigate = useNavigate();

  const handleClick = (type, id) => {
    switch (type) {
      case 'collectionPlaylist':
      case 'playlists':
        navigate(`/playlist/${id}`);
        break;
      case 'followingArtists':
      case 'artists':
        navigate(`/artist/${id}`);
        break;
      case 'artist-albums':
      case 'albums':
      case 'album':
      case 'singles':
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

  const borderRadiusType = ['artists', 'fans', 'followingArtists'];
  const noPlayButtonType = ['fans', 'follow'];

  const { playTrack } = useContext(PlayerContext);

  return (
    <Col xs={12} md={8} lg={8} xl={4} xxl={3} key={item.id}>
      <StyledCard
        hoverable
        style={{ width: '100%', padding: 16 }}
        cover={
          <div className="cover-img-outer">
            <div className="image-container">
              <div
                className="cover-img"
                style={{
                  backgroundImage:
                    item.coverUrl !== undefined
                      ? `url(${item.coverUrl})`
                      : `url(${UnknownArtist})`,
                  borderRadius: borderRadiusType.includes(type) ? '50%' : '',
                }}
              ></div>
            </div>
          </div>
        }
        onClick={(e) => {
          if (e.target.tagName === 'IMG' || e.target.tagName === 'DIV') {
            handleClick(type, item.id);
          } else if (e.target.tagName === 'A') {
            return;
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
            ['tracks', 'albums'].includes(type) ? (
              <div className="artist-links">
                {item.artistIDs.map((artistID, idx) => {
                  return (
                    <Link key={artistID} to={`/artist/${artistID}`}>
                      {item.artistNames[idx]}
                    </Link>
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
}

export default CustomCard;

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
    padding: 16px 0 0 0;
  }

  .cover-img-outer {
    position: relative;
    max-width: 200px;
    .image-container {
      width: 100%;
      &:before {
        content: '';
        display: block;
        width: 100%;
        padding-top: 100%;
      }
      .cover-img {
        background-repeat: no-repeat;
        background-size: cover;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #333;
        color: #b3b3b3;
      }
    }
  }

  .ant-card-cover {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .ant-card-meta-detail {
    min-height: 72px;
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
  top: 50%;
  right: 0%;
  z-index: 3;
  transition: 0.5s ease;

  &:hover {
    transform: scale(1.05);
    background-color: #1fdf64;
  }
`;
