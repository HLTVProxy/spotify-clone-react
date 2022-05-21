import { useEffect, useState, useContext } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Layout } from 'antd';
import './index.css';
import Header from './components/common/Header';
import Sider from './components/common/Sider';
import MobileSider from './components/common/MobileSider';
import Player from './components/common/Player';
import StyledContent from './components/common/Content';
import Login from './components/pages/Login';
import Oauth from './components/pages/Oauth';
import Home from './components/pages/Home';
import Search from './components/pages/Search';
import User from './components/pages/User';
import PlayLists from './components/pages/Collection/PlayLists';
import Artists from './components/pages/Collection/Artists';
import Albums from './components/pages/Collection/Albums';
import PlayList from './components/pages/PlayList';
import Artist from './components/pages/Artist';
import Album from './components/pages/Album';
import ResultTracks from './components/pages/Results/Tracks';
import ResultArtists from './components/pages/Results/Artists';
import Genre from './components/pages/Genre';
import Track from './components/pages/Track';
import { PlayerProvider } from './contexts/PlayerContext';
import { SeedProvider } from './contexts/TrackSeedContext';
import { UserProvider } from './contexts/UserContext';
import AuthContext from './contexts/AuthContext';

function App() {
  // Spotify token
  const [token, setToken] = useState('');
  const { accessToken} = useContext(AuthContext);

  useEffect(() => {
    if (accessToken !== '') {
      setToken(accessToken);
    } else if (
      window.localStorage.getItem('refresh_token') !== null &&
      window.location.pathname !== '/oauth'
    ) {
      window.location.href = '/oauth';
    }
  }, [accessToken]);

  // Sidebar selected menu
  const topics = [
    { key: 'home', name: '首頁', path: '/' },
    { key: 'search', name: '搜尋', path: '/search' },
    { key: 'collection', name: '你的音樂庫', path: '/collection' },
  ];

  const [selectedKey, setSelectedKey] = useState('');
  useEffect(() => {
    let pathName = window.location.pathname;
    let key = '';
    if (pathName.includes('/user')) {
      key = '';
    } else if (
      pathName.includes('/playlist') &&
      !pathName.includes('/collection/playlists')
    ) {
      let pathSplitArr = pathName.split('/');
      key = pathSplitArr[2];
    } else {
      let topicIndex = 0;
      topics.forEach((val, idx) => {
        if (pathName.includes(val.path)) {
          topicIndex = idx;
        }
      });
      key = topics[topicIndex].key;
    }
    setSelectedKey(key);
  }, [window.location.pathname]);

  const changeSelectedKey = (event) => {
    const key = event.key;
    setSelectedKey(key);
  };

  const Menu = (
    <MobileSider
      topics={topics}
      selectedKey={selectedKey}
      changeSelectedKey={changeSelectedKey}
    />
  );

  return !token ? (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/oauth" element={<Oauth />} />
      </Routes>
    </Router>
  ) : (
    <Layout className="App">
      <UserProvider>
        <PlayerProvider>
          <SeedProvider>
            <Router>
              <Header menu={Menu} />
              <Layout>
                <Sider menu={Menu} />
                <Layout>
                  <StyledContent>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/search" element={<Search />} />
                      <Route path="/search/:searchText" element={<Search />} />
                      <Route
                        path="/search/:searchText/tracks"
                        element={<ResultTracks />}
                      />
                      <Route
                        path="/search/:searchText/artists"
                        element={<ResultArtists />}
                      />
                      <Route path="/playlist/:id" element={<PlayList />} />
                      <Route path="/user" element={<User />} />
                      <Route path="/artist/:id" element={<Artist />} />
                      <Route path="/album/:id" element={<Album />} />
                      <Route path="/genre/:id" element={<Genre />} />
                      <Route path="/track/:id" element={<Track />} />
                      <Route
                        path="/collection"
                        element={
                          <Navigate to="/collection/playlists" replace />
                        }
                      />
                      <Route
                        path="/collection/playlists"
                        element={<PlayLists />}
                      />
                      <Route
                        path="/collection/playlists/:id"
                        element={<PlayList />}
                      />
                      <Route path="/collection/artists" element={<Artists />} />
                      <Route path="/collection/albums" element={<Albums />} />
                    </Routes>
                  </StyledContent>
                </Layout>
              </Layout>
            </Router>
            <Player token={token} />
          </SeedProvider>
        </PlayerProvider>
      </UserProvider>
    </Layout>
  );
}

export default App;
