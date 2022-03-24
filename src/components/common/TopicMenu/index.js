import { Menu } from 'antd';
import styled from 'styled-components';
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
		<StyledMenu mode="inline" selectedKeys={[selectedKey]} theme="dark">
			{styledTopics}
		</StyledMenu>
	);
}

const StyledMenu = styled(Menu)`
	height: 100%;
`;
