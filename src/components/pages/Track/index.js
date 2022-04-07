import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import InfoHeader from '../../common/InfoHeader';
import ActionBar from '../../common/ActionBar';
import HotTrackList from '../../common/HotTrackList';
import CardList from '../../common/CardList';
import styled from 'styled-components';

function Track() {
  const params = useParams();
  const navigate = useNavigate();
  return (
    <>
      <InfoHeader type="track" description={false} detail={true} />
      <ActionBar />
      <ArtistButton
        onClick={() => {
          navigate(`/artist/ccc`);
        }}
      >
        <img
          src="https://img.mymusic.net.tw/mms/album/L/755/5410755.jpg"
          alt="Artist Image"
        />
        <div className="artist-text">
          <span>藝人</span>
          <h3>任然</h3>
        </div>
      </ArtistButton>
      <HotTrackList title="任然" type="track" />
      <CardList title={`任然的熱門發行內容`} detail={false} type="albums" />
    </>
  );
}

export default Track;

const ArtistButton = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 8px;
  transition: all 0.3 ease-in-out;

  &:hover {
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.1);
  }
  img {
    width: 80px;
    border-radius: 50%;
  }
  h3 {
    color: #fff;
  }
  .artist-text {
    padding-left: 16px;
    span {
      font-size: 12px;
    }
  }
`;
