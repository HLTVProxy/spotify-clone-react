import { Menu } from 'antd';
import styled from 'styled-components';
import { BrowserRouter as Router, Link } from 'react-router-dom';

export default function MobileSider({
  topics,
  selectedKey,
  changeSelectedKey,
}) {
  let menuItems = topics.map((topic, index) => {
    return (
      <Menu.Item
        className="menu-selected-color"
        onClick={changeSelectedKey}
        key={index}
      >
        <Link to={`${topic.path}`}>{topic.name}</Link>
      </Menu.Item>
    );
  });

  return (
      <StyledMenu mode="inline" selectedKeys={[selectedKey]} theme="dark">
        {menuItems}
      </StyledMenu>
  );
}

const StyledMenu = styled(Menu)`
  height: 100%;
`;
