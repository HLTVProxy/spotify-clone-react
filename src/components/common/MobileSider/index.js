import { Menu } from 'antd';
import styled from 'styled-components';
export default function MobileSider({ topics, selectedKey, changeSelectedKey }) {
  const menuItems = [];
  topics.forEach((topic, index) =>
    menuItems.push(
      <Menu.Item
        className="menu-selected-color"
        key={index}
        onClick={changeSelectedKey}
      >
        {topic}
      </Menu.Item>
    )
  );
  return (
    <StyledMenu mode="inline" selectedKeys={[selectedKey]} theme="dark">
      {menuItems}
    </StyledMenu>
  );
}

const StyledMenu = styled(Menu)`
  height: 100%;
`;
