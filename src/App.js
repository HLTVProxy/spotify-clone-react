import { useState } from 'react';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import Header from './components/common/Header';
import Sider from './components/common/Sider';
import TopicMenu from './components/common/TopicMenu';
import './index.css';

const { Content } = Layout;

function App() {
	const topics = ['首頁', '搜尋', '你的音樂庫'];
	const [contentIndex, setContentIndex] = useState(0);
	const [selectedKey, setSelectedKey] = useState('0');
	const changeSelectedKey = event => {
		const key = event.key;
		setSelectedKey(key);
		setContentIndex(+key);
	};
	const Menu = <TopicMenu topics={topics} selectedKey={selectedKey} changeSelectedKey={changeSelectedKey} />;
	return (
		<div className="App">
			<Header menu={Menu} />
			<Layout>
				<Sider menu={Menu} />
				<Content className="content">{topics[contentIndex]}</Content>
			</Layout>
		</div>
	);
}

export default App;
