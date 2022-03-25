import { Menu } from 'antd';
import styled from 'styled-components';
import { BrowserRouter as Router, Link } from 'react-router-dom';

export default function MobileSider({
  topics,
  selectedKey,
  changeSelectedKey,
}) {
  let urlTrans = {
    '首頁': '', 
    '搜尋': 'search', 
    '你的音樂庫': 'playlists'
  }
  let menuItems = topics.map((topic, index) => {
    return (
      <Menu.Item
        className="menu-selected-color"
        onClick={changeSelectedKey}
        key={index}
      >
        <Link to={`/${urlTrans[topic]}`}>{topic}</Link>
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
