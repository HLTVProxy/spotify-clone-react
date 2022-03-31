import React from 'react';
import styled from 'styled-components';

const infoTitle = (type) => {
  switch (type) {
    case 'user':
      return '個人檔案';
    case 'artist':
      return '';
    case 'album':
      return '專輯';
    case 'single':
      return '單曲';
    default:
      return '播放清單';
  }
};

function InfoHeader({ type = 'playlist', description = true }) {
  return (
    <Info type={type} description={description}>
      <div className="info-left">
        <img src="https://lineup-images.scdn.co/wrapped-2021-top100_LARGE-zh-Hant.jpg" />
      </div>
      <div className="info-right">
        <h2>{infoTitle(type)}</h2>
        <span>
          <h1>2021 年你的最愛歌曲</h1>
        </span>
        <p className="info-description">
          Spotify 年度總回顧為你呈現你今年最愛的歌曲
        </p>
        <div className="info-detail">
          <div className="artist">Spotify</div>
          <div className="total-songs-and-duration">
            <span>
              100 首歌, <span>6 小時 17 分</span>
            </span>
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
    display: ${(props) => (props.type !== 'playlist' ? 'none' : 'flex')};
  }

  .user-public-status {
    display: ${(props) => (props.type === 'user' ? 'flex' : 'none')};
  }

  .total-songs-and-duration::before,
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
