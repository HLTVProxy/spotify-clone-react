import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import './index.css';
import Header from './components/common/Header';
import Sider from './components/common/Sider';
import MobileSider from './components/common/MobileSider';
import Home from './components/content/Home';
import Search from './components/content/Search';
import PlayList from './components/content/PlayLists';

const { Content, Footer } = Layout;

function App() {
  const topics = [
    {'name': '首頁', 'path': '/'},
    {'name': '搜尋', 'path': '/search'},
    {'name': '你的音樂庫', 'path': '/playlists'},
  ];
  const [selectedKey, setSelectedKey] = useState('');

  useEffect(() => {
    let pathName = window.location.pathname;
    let topicIndex = 0;
    topics.forEach((val, idx) => {
      if (val.path === pathName) {
        topicIndex = idx;
      }
    })
    setSelectedKey(topicIndex.toString());
  }, []);

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
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/search" element={<Search />} />
            <Route exact path="/playlists" element={<PlayList />} />
          </Routes>
        </Layout>
      </Router>
      <Footer>bottom</Footer>
    </Layout>
  );
}

export default App;
