import { useContext } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import { Layout } from 'antd';
import styled from 'styled-components';
import PlayerContext from '../../../contexts/PlayerContext';
const { Footer } = Layout;

function Player({ token }) {
  const { currentPlayerUri } = useContext(PlayerContext);
  return !token ? '' : (
    <PlayerDiv>
      <SpotifyPlayer
        token={token}
        uris={currentPlayerUri}
        play={currentPlayerUri ? true : false}
        initialVolume={0.5}
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
    ._DevicesRSWP div button{
      color: #000;
    }
  }
`;

