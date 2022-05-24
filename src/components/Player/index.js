import { useState, useEffect, useContext } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import { Layout } from 'antd';
import styled from 'styled-components';
import PlayerContext from '../../contexts/PlayerContext';
const { Footer } = Layout;

function Player({ token }) {
  const { currentPlayerUri, setIsPlay, isPlay } = useContext(PlayerContext);
  const [trackUri, setTrackUri] = useState('');
  useEffect(() => {
    setTrackUri(currentPlayerUri);
    setIsPlay(true);
  }, [currentPlayerUri]);
  return !token ? (
    ''
  ) : (
    <PlayerDiv>
      <SpotifyPlayer
        token={token}
        uris={trackUri}
        play={isPlay}
        initialVolume={0.5}
        callback={(state) => {
          if (state.isPlaying === false) {
            setTrackUri('');
            setIsPlay(false);
          }
        }}
      />
    </PlayerDiv>
  );
}

export default Player;

const PlayerDiv = styled(Footer)`
  padding: 16px;
  background-color: #000;
  color: #fff;
  .PlayerRSWP {
    background-color: #000 !important;
    ._ContentRSWP .rswp__active p:first-of-type a,
    ._ControlsRSWP button,
    ._ActionsRSWP button {
      color: #fff;
    }
    ._DevicesRSWP div button {
      color: #000;
    }
  }
`;
