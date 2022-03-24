import { Menu } from 'antd';
export default function TopicMenu({ topics, selectedKey, changeSelectedKey }) {
	const styledTopics = [];
	topics.forEach((topic, index) =>
		styledTopics.push(
			<Menu.Item className="menu-selected-color" key={index} onClick={changeSelectedKey}>
				{topic}
			</Menu.Item>
		)
	);
	return (
		<Menu mode="inline" selectedKeys={[selectedKey]} theme="dark" style={{ height: '100%' }}>
			{styledTopics}
		</Menu>
	);
}
