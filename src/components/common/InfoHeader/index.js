import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import UnknownArtist from '../../../img/UnknownArtist.png';

function InfoHeader({
  type = 'playlist',
  description = true,
  detail = false,
  children,
}) {
  const infoTitle = (type) => {
    switch (type) {
      case 'user':
        return '個人檔案';
      case 'artist':
        return '';
      case 'album':
        if (children.albumType === 'album') {
          return '專輯';
        } else if (children.trackCount > 1) {
          return '迷你專輯';
        } else {
          return '單曲';
        }
      case 'track':
        return '歌曲';
      default:
        return '播放清單';
    }
  };
  return (
    <Info type={type} description={description} detail={detail}>
      <div className="info-left">
        <div className="cover-img-outer">
          <div className="image-container">
            <div
              className="cover-img"
              style={{
                backgroundImage:
                  children.coverUrl !== undefined
                    ? `url(${children.coverUrl})`
                    : `url(${UnknownArtist})`,
                borderRadius: type === 'artist' ? '50%' : '',
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="info-right">
        <h2>{infoTitle(type)}</h2>
        <span>
          <h1>{children.title}</h1>
        </span>
        <p className="info-description">{children.description}</p>
        <div className="info-detail">
          {children.artists && (
            <div className="artist">
              {children.artists.map((artist, idx, artists) => (
                <>
                  <span>
                    <Link key={artist.id} to={`/artist/${artist.id}`}>
                      {artist.name}
                    </Link>
                    {idx !== artists.length - 1 ? '・' : ''}
                  </span>
                </>
              ))}
            </div>
          )}
          {children.releaseDate && (
            <div className="release-year">{children.releaseDate[0]}</div>
          )}
          {children.owner && <div className="owner">{children.owner}</div>}
          {type === 'artist' ? (
            <span className="listener">{`每月 ${children.followers} 名聽眾`}</span>
          ) : (
            ''
          )}
          <div className="total-songs-and-duration">
            {children.trackCount && (
              <span className="track-count">{children.trackCount} 首歌</span>
            )}
            {children.followers && type !== 'artist' ? (
              <span className="like-count">{`${
                children.followers !== undefined
                  ? `${children.followers} 人按讚`
                  : ''
              }`}</span>
            ) : (
              ''
            )}
            {children.duration && (
              <span className="duration">{children.duration}</span>
            )}
          </div>
        </div>
        <div className="user-public-status">
          <div className="playlist-count">6 個公開播放清單</div>
          <div className="fans-count">18 位粉絲</div>
          <div className="follow-count">5 人關注中</div>
        </div>
      </div>
    </Info>
  );
}

export default InfoHeader;

const Info = styled.div`
  display: flex;
  padding-top: 32px;
  padding-bottom: 16px;

  h1 {
    font-size: 72px;
    line-height: 72px;
    font-weight: 900;
    letter-spacing: -0.04em;
    margin: 0;
    padding-bottom: 16px;
  }

  h2 {
    color: #fff;
    font-size: 12px;
  }

  img {
    width: 200px;
    border-radius: ${(props) => (props.type == 'artist' ? '50%' : '')};
  }

  .info-left {
    width: 232px;
    max-width: 232px;
    .cover-img-outer {
      position: relative;
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
  }

  .info-right {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-left: 32px;
  }

  .info-description {
    display: ${(props) => (props.description === false ? 'none' : 'inline')};
    color: rgba(255, 255, 255, 0.7);
  }

  .info-detail {
    display: ${(props) => (props.detail ? 'flex' : 'none')};
  }

  .info-detail .artist a {
    color: #fff;
    &:hover {
      text-decoration: underline;
    }
  }

  .user-public-status {
    display: ${(props) => (props.type === 'user' ? 'flex' : 'none')};
  }
  .release-year::before,
  .track-count::before,
  .like-count::before,
  .duration::before,
  .fans-count::before,
  .follow-count::before {
    content: '•';
    margin: 0 4px;
  }

  @media (max-width: 576px) {
    flex-wrap: wrap;
    .info-left,
    .info-right {
      width: 100%;
    }
    .info-left {
      display: flex;
      justify-content: center;
    }
    .info-right {
      display: flex;
      align-items: center;
      padding: 16px 16px 0;
      h1 {
        font-size: 28px;
        padding-bottom: 8px;
      }
      h2 {
        display: none;
      }
    }
  }
`;
