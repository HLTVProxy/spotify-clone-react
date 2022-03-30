import { useEffect, useState } from 'react';
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
import StyledContent from './components/common/Content';
import Home from './components/pages/Home';
import Search from './components/pages/Search';
import PlayLists from './components/pages/Collection/PlayLists';
import Artists from './components/pages/Collection/Artists';
import Albums from './components/pages/Collection/Albums';
import PlayList from './components/common/PlayList';

const { Footer } = Layout;

function App() {
  const topics = [
    { key: 'home', name: '首頁', path: '/' },
    { key: 'search', name: '搜尋', path: '/search' },
    { key: 'collection', name: '你的音樂庫', path: '/collection' },
  ];
  const [selectedKey, setSelectedKey] = useState('');

  useEffect(() => {
    let pathName = window.location.pathname;
    let topicIndex = 0;
    topics.forEach((val, idx) => {
      if (pathName.includes(val.path)) {
        topicIndex = idx;
      }
    });
    setSelectedKey(topics[topicIndex].key);
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
  
  return (
    <Layout className="App">
      <Router>
        <Header menu={Menu} />
        <Layout>
          <Sider menu={Menu} />
          <Layout>
            <StyledContent>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route
                  path="/collection"
                  element={<Navigate to="/collection/playlists" replace />}
                />
                <Route path="/collection/playlists" element={<PlayLists />} />
                <Route path="/collection/artists" element={<Artists />} />
                <Route path="/collection/albums" element={<Albums />} />
                <Route path="/playlists/:id" element={<PlayList />} />
              </Routes>
            </StyledContent>
          </Layout>
        </Layout>
      </Router>
      <Footer>bottom</Footer>
    </Layout>
  );
}

export default App;
