import { useState } from 'react';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import Header from './components/common/Header';
import Sider from './components/common/Sider';
import MobileSider from './components/common/MobileSider';
import './index.css';

const { Content, Footer } = Layout;

function App() {
  const topics = ['首頁', '搜尋', '你的音樂庫'];
  const [contentIndex, setContentIndex] = useState(0);
  const [selectedKey, setSelectedKey] = useState('0');
  const changeSelectedKey = (event) => {
    const key = event.key;
    setSelectedKey(key);
    setContentIndex(key);
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
      <Header menu={Menu} />
      <Layout>
        <Sider menu={Menu} />
        <Content className="content">{topics[contentIndex]}</Content>
      </Layout>
      <Footer>bottom</Footer>
    </Layout>
  );
}

export default App;
