import { useState, createContext } from 'react';

const PlayerContext = createContext('');

export function PlayerProvider({children}) {
  const [currentPlayerUri, setPlayerUri] = useState('');
  const [isPlay, setIsPlay] = useState(false);

  const playTrack = (uri) => {
    setPlayerUri(uri);
  }

  return <PlayerContext.Provider value={{currentPlayerUri, playTrack, isPlay, setIsPlay}}>{children}</PlayerContext.Provider>
}

export default PlayerContext;
