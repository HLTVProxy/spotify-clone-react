import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import StyledContent from '../../common/Content';

function Index() {
  let { id } = useParams();
  return (
    <StyledContent>
      <Info>
        <div className="info-left">
          <img src="https://lineup-images.scdn.co/wrapped-2021-top100_LARGE-zh-Hant.jpg" />
        </div>
        <div className="info-right">
          <h2>播放清單</h2>
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
                100 首歌, <span></span>6 小時 17 分
              </span>
            </div>
          </div>
        </div>
      </Info>
    </StyledContent>
  );
}

export default Index;

const Info = styled.div`
  display: flex;
  padding-top: 32px;
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
  }
  .info-right {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-left: 32px;
  }
  .info-description {
      color: rgba(255,255,255,.7);
  }
  .info-detail {
    display: flex;
  }
  .total-songs-and-duration::before {
    content: '•';
    margin: 0 4px;
  }
`;
