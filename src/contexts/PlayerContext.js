import { useState, createContext } from 'react';

const PlayerContext = createContext('');

export function PlayerProvider({children}) {
  const [currentPlayerUri, setPlayerUri] = useState('');

  const playTrack = (uri) => {
    setPlayerUri(uri);
  }

  return <PlayerContext.Provider value={{currentPlayerUri, playTrack}}>{children}</PlayerContext.Provider>
}

export default PlayerContext;
