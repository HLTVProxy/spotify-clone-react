import { useState, createContext } from 'react';

const SeedContext = createContext('');

export function SeedProvider({children}) {
  const [seed, setSeed] = useState([]);

  const generateSeed = (seed) => {
    setSeed(seed);
  }

  return <SeedContext.Provider value={{seed, generateSeed}}>{children}</SeedContext.Provider>
}

export default SeedContext;
